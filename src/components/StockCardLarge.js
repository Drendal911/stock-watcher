import stockCard from '../styles/components/stockCardLarge.module.scss'
import {useSelector} from "react-redux";
import {useState, useEffect} from "react";

export default function StockCardLarge() {
    //useSelector automatically subscribes the component to redux store and allows component to use the desired portion of the store only
    const stock = useSelector(stock => stock);
    const [stockChange, setStockChange] = useState(false);

    useEffect(() => {
        if (stock["change"].toString().substring(0, 1) === "-") {
            setStockChange(false);
        } else if (stock["change"].toString().substring(0, 1) !== "-") {
            setStockChange(true);
        }
    }, [stock]);


    return (
        <>
            {stock["name"] === "" ?
                <div className={stockCard.main_container}>
                    <div className={stockCard.card_container}>
                        <div className={stockCard.initialGreeting}>To get started, enter a company name in the input field or toggle the search type, then enter a stock symbol.</div>
                    </div>
                </div>
                :
                <div className={stockCard.main_container}>
                    <div className={stockCard.card_container}>
                        <div className={stockCard.name}>{stock["name"]}</div>
                        <div className={stockCard.symbol}>{stock["symbol"]}</div>
                        <div className={stockCard.price}>{stock["price"]} <span
                            className={stockCard.price_span}> USD</span>
                            {stockChange ?
                                <div className={stockCard.stock_change_container}>
                                    <span
                                        className={stockCard.price_change_green}>{stock["change"]} ({stock["changesPercentage"]})</span>
                                    Today
                                </div>
                                :
                                <div className={stockCard.stock_change_container}>
                                    <span
                                        className={stockCard.price_change_red}>{stock["change"]} ({stock["changesPercentage"]})</span>
                                    Today
                                </div>
                            }
                        </div>
                        <div className={stockCard.high}>High {stock["dayHigh"]}</div>
                        <div className={stockCard.low}>Low {stock["dayLow"]}</div>
                    </div>
                </div>
            }
        </>
    )
}