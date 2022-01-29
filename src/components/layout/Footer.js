import footer from '../../styles/components/layout/footer.module.scss'
import {useEffect, useState} from "react";


export default function Footer() {
    const [index, setIndex] = useState([]);
    let temp = [];

    useEffect(() => {
        majorIndexes().then()
    }, []);

    async function majorIndexes() {
        try {
            const url = `https://zvvlvtt198.execute-api.us-east-2.amazonaws.com/v1?stock=index`;
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    data.body.map(element => {
                        //Remove the '^' from in front of the major index symbols
                        let symbol = "";
                        let isPositive = true;
                        if (element.symbol.substring(0, 1) === "^") {
                            symbol = element.symbol.substring(1);
                        } else {
                            symbol = element.symbol;
                        }

                        //Check to see if the price change is positive or negative then set stockChange boolean
                        if (element.change.toString().substring(0, 1) === "-") {
                            isPositive = false;
                        } else if (element.change.toString().substring(0, 1) !== "-") {
                            isPositive = true;
                        }

                        //Create an object with desired properties from each item in the returned data
                        const object = {
                            symbol: symbol,
                            price: "$" + element.price.toFixed(2),
                            change: element.change.toFixed(2),
                            percentChange: element.changesPercentage.toFixed(2) + "%",
                            isPositive: isPositive
                        }
                        temp.push(object);

                        //Save the created object in the index state
                        setIndex((prevState) => {
                            return {
                                ...prevState,
                                ...temp
                            };
                        })
                    })
                });
        } catch (e) {
            console.log(e.message);
        }
    }

    const list = Object.entries(index).map(([key, value]) => (
                <li key={key}>
                    <div>{value.symbol}</div>
                    <div>{value.price}</div>
                    {value.isPositive ?
                        <div className={footer.stock_change_container}>
                    <span
                        className={footer.price_change_green}>{value.change} ({value.percentChange})</span>
                            Today
                        </div>
                        :
                        <div className={footer.stock_change_container}>
                    <span
                        className={footer.price_change_red}>{value.change} ({value.percentChange})</span>
                        </div>
                    }
                </li>
            )
    )

    return (
        <div className={footer.main_container}>
            <div className={footer.marquee_container}>
                <ul className={footer.marquee_content}>
                    {list}
                </ul>
            </div>
        </div>
    )
}