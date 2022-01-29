import {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";
import Button from "./Button";
import inputCSS from "../styles/components/input.module.scss";
import SuggestionInput from "./SuggestionInput";


export default function Form() {
    const input = useRef();
    const dispatch = useDispatch();
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
                console.log(e.message);
            }
        } else {
            alert("Please enter a stock ticker.")
        }
    }


    return (
        <>
            <div className={inputCSS.container}>
                <label htmlFor="stock"/>
                {/*SuggestionInput is a functional component, so you can't pass the ref as 'ref' without getting a warning. I chose to use 'innerRef' but it could be anything ('test' for example)*/}
                <SuggestionInput suggestions={allstocks}
                                 innerRef={input}
                                 showSingleStock={showSingleStock}/>
                <Button function={showSingleStock} text={"View Stock Info"}/>
            </div>
        </>
    )
}