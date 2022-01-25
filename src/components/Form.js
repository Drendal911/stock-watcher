import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "./Button";
import inputCSS from "../styles/components/input.module.scss";


export default function Form() {
    const input = useRef();
    const dispatch = useDispatch();

    //Show single stock
    async function showSingleStock() {
        const value = input.current.value.trim().toUpperCase();

        if (value.length > 0 && value.length < 7) {
            try {
                const url = `https://zvvlvtt198.execute-api.us-east-2.amazonaws.com/v1?stock=${value}`;
                await fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        // console.log(data.body);
                        console.log(data.body[0]);
                        dispatch( {type: "newStock", incomingStock: data.body[0] })
                    });
            } catch (e) {
                console.log(e.message);
            }
        } else {
            alert("Please enter a stock ticker.")
        }
    }

    return (
        <div>
            <div className={inputCSS.container}>
                <label htmlFor="stock"/>
                <input id="stock" type="text" className={inputCSS.input} ref={input}
                       placeholder={"Enter Stock Ticker"} required/>
            </div>
            <Button function={showSingleStock} text={"View Stock Info"}/>
        </div>
    )
}