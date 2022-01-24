import {useEffect, useRef, useState} from "react";
import Button from "./Button";
import inputCSS from "../styles/components/input.module.scss";


export default function Form() {
    const [majorIndexes, setMajorIndexes] = useState({});
    const [singleStock, setSingleStock] = useState({});
    const input = useRef();
    let currentDateObj = new Date();

    // Console logs the chosen stock anytime it changes
    // useEffect(() => {
    //     if (singleStock.T !== undefined) {
    //         console.log("setState completed", singleStock);
    //     }
    // }, [singleStock]);


    function showSingleStockState() {
        console.log(singleStock);
    }

    //If it's the weekend, set the date to the last Friday (when the markets were open)
    function adjustForWeekend(currentDateObj) {
        if (currentDateObj.getDay() === 6 || currentDateObj.getDay() === 0) {
            currentDateObj.setDate(currentDateObj.getDate() - (currentDateObj.getDay() + 2) % 7);
        }
    }

    //Format date YYYY-MM-DD
    function dateFormatter(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; //Month from 0 to 11
        const year = date.getFullYear();
        return '' + year + '-' + (month <= 9 ? '0' + month : month) + '-' + (day <= 9 ? '0' + day : day);
    }

    //Show single stock
    async function showSingleStock() {
        const value = input.current.value.trim().toUpperCase();

        if (value.length > 0 && value.length < 7) {
            try {
                const url = `https://zvvlvtt198.execute-api.us-east-2.amazonaws.com/v1?stock=${value}`;
                await fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        setSingleStock(data.body[0]);
                        console.log(data);
                    });
            } catch (e) {
                console.log(e.message);
            }
        } else {
            alert("yo ticka wrong!")
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
            <Button function={showSingleStockState} text={"Show stock state"}/>
        </div>
    )
}