import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "./Button";
import SuggestionInput from "./SuggestionInput";
import inputCSS from "../styles/components/input.module.scss";


export default function Form() {
    const input = useRef();
    const dispatch = useDispatch();
    const loading = useSelector(stock => stock.loadingSuggestions);
    let allstocks = [];

    useEffect(() => {
        getAllStocks();
    }, [allstocks])


    async function getAllStocks() {
        allstocks = await fetch(`https://zvvlvtt198.execute-api.us-east-2.amazonaws.com/v1?stock=allstocks`)
            .then(response => response.json())
            .then(data => {
                data.body.map(element => {
                    allstocks.push(element.symbol);
                });
            }).then(r => {
                dispatch({type: "loading", loadingSuggestions: false})
            });
    }

    //Display selected stock in a stock card
    async function showSingleStock() {
        const value = input.current.value.trim().toUpperCase();

        if (value.length > 0 && value.length < 7) {
            try {
                const url = `https://zvvlvtt198.execute-api.us-east-2.amazonaws.com/v1?stock=${value}`;
                await fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        dispatch({type: "newStock", incomingStock: data.body[0]})
                    });
            } catch (e) {
                if (e.message === "Cannot read properties of undefined (reading 'symbol')") {
                    showModal(`Unable to locate a stock symbol matching: ${value}`)
                } else {
                    console.log(e.message);
                }
            }
        } else {
            showModal("Please enter a stock symbol.");
        }
    }

    function showModal(text) {
        dispatch({
            type: "modal", incModal: {
                showModal: true,
                modalText: text
            }
        });
    }


    return (
        <>
            <div className={inputCSS.container}>
                <label htmlFor="stock"/>
                {loading ?
                    <>
                        <SuggestionInput suggestions={allstocks}
                                         innerRef={input}
                                         showSingleStock={showSingleStock}/>
                        <div className={inputCSS.loading}>
                            <p>Loading stock suggestions...</p>
                            <iframe src="https://giphy.com/embed/cjnnH0h3cfBTORaUnp" className={inputCSS.giphy_embed}/>
                        </div>
                    </>
                    :
                    <SuggestionInput suggestions={allstocks}
                                     innerRef={input}
                                     showSingleStock={showSingleStock}/>
                }
                <Button function={showSingleStock} text={"View Stock Info"}/>
            </div>
        </>
    )
}