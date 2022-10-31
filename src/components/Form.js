import inputCSS from "../styles/components/suggestionInput.module.scss";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import Button from "./Button";
import SuggestionInput from "./SuggestionInput";
import Toggle from "./toggle";


export default function Form() {
    const input = useRef();
    const dispatch = useDispatch();
    const loading = useSelector(stock => stock["loadingSuggestions"]);
    let stockNames = [];

    useEffect(() => {
        async function getAllStocks() {
            let temp = [];
            const url = 'https://www.qhmediaservices.one/stock-watch/all-stocks'
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    data.forEach(element => {
                        stockNames.push(element.name);
                        temp.push({...element})
                    });
                }).then(() => {
                    dispatch({type: "loading", loadingSuggestions: false});
                    dispatch({type: "allstocks", allStocks: [...temp]});
                });
        }
        getAllStocks().then(() => {});
    })




    //Display selected stock in a stock card
    async function showSingleStock(value) {
        if (value.length > 0) {
            try {
                const url = `https://www.qhmediaservices.one/stock-watch/single-stock/?stock=${value}`;
                await fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        dispatch({type: "newStock", incomingStock: data[0]})
                    });
            } catch (e) {
                if (e.message === "Cannot read properties of undefined (reading 'symbol')") {
                    showModal(`Unable to locate a stock symbol matching: ${value}`)
                } else if (e.message === "Failed to fetch") {
                    showModal("No response. The server may be down. Please try again later.");
                } else {
                    showModal(e.message);
                }
            }
        } else {
            showModal("Please enter a stock symbol.");
        }
    }

    function viewStockInfoHandler() {
        const value = input.current["value"].toUpperCase();
        showSingleStock(value).then(() => {
            input.current.value = "";
            input.current.focus();
        });
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
                        <SuggestionInput suggestions={stockNames}
                                         innerRef={input}
                                         showSingleStock={showSingleStock}/>
                        <div className={inputCSS.loading}>
                            <p>Loading stock suggestions...</p>
                            <iframe
                                src="https://giphy.com/embed/cjnnH0h3cfBTORaUnp" className={inputCSS.giphy_embed}
                                title={'Loading Spinner'}
                            />
                        </div>
                    </>
                    :
                    <SuggestionInput suggestions={stockNames}
                                     innerRef={input}
                                     showSingleStock={showSingleStock}/>
                }
                <Toggle/>
                <Button function={viewStockInfoHandler} text={"View Stock Info"}/>
            </div>
        </>
    )
}