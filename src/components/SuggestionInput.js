import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import input_css from "../styles/components/suggestionInput.module.scss";

export default function SuggestionInput({innerRef, showSingleStock}) {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [savedInput, setSavedInput] = useState("");
    const allStocksList = useSelector(stock => stock["allStocks"]);
    const toggleStatus = useSelector(stock => stock["companyName"]);


    useEffect(() => {
        if (savedInput.length < 2) {
            setShowSuggestions(false);
        }
    }, [savedInput])

    function getStockSymbol(value) {
        return value.split(" | ")[1];
    }

    function resetSuggestions(e) {
        setFilteredSuggestions([]);
        setActiveSuggestionIndex("");
        setShowSuggestions(false);
        setSavedInput(e.target.value);
    }

    function onChangeByCompanyName(e) {
        const userInput = e.target.value;

        if (userInput.length > 1) {
            const stockFilter = allStocksList.filter((element) => {
                return element.name.toLowerCase().includes(userInput.toLowerCase());
            })

            const stockMap = stockFilter.map((element) => {
                return element.name + " | " + element.symbol;
            });

            setSavedInput(e.target.value);
            setFilteredSuggestions(stockMap);
            setActiveSuggestionIndex("");
            setShowSuggestions(true);
        }
    }

    function onChangeByCompanySymbol(e) {
        const userInput = e.target.value;

        if (userInput.length > 1) {
            const stockFilter = allStocksList.filter((element) => {
                return element.symbol.toUpperCase().includes(userInput.toUpperCase());
            })

            const stockMap = stockFilter.map((element) => {
                return element.name + " | " + element.symbol;
            });

            setSavedInput(e.target.value);
            setFilteredSuggestions(stockMap);
            setActiveSuggestionIndex("");
            setShowSuggestions(true);
        }

    }

    // Highlight the next/previous item in suggestions list when arrow keys are pressed
    function keyPress(e) {
        switch (e.code) {
            case "ArrowUp":
            case "Numpad8":
                if (activeSuggestionIndex === "" && filteredSuggestions) {
                    setActiveSuggestionIndex(filteredSuggestions.length - 1);
                } else {
                    activeSuggestionIndex - 1 < 0 ?
                        setActiveSuggestionIndex(filteredSuggestions.length - 1) :
                        setActiveSuggestionIndex(activeSuggestionIndex - 1);
                }
                break;
            case "ArrowDown":
            case "Numpad2":
                if (activeSuggestionIndex === "" && filteredSuggestions) {
                    setActiveSuggestionIndex(0);
                } else {
                    activeSuggestionIndex + 1 > filteredSuggestions.length - 1 ?
                        setActiveSuggestionIndex(0) :
                        setActiveSuggestionIndex(activeSuggestionIndex + 1);
                }
                break;
            case "Enter":
            case "NumpadEnter":
                if (activeSuggestionIndex !== "") {
                    showSingleStock(getStockSymbol(filteredSuggestions[activeSuggestionIndex]));
                    resetSuggestions(e);
                    innerRef.current.value = "";
                    innerRef.current.focus();
                } else {
                    showSingleStock(innerRef.current.value.toUpperCase());
                    resetSuggestions(e);
                    innerRef.current.value = "";
                    setSavedInput(e.target.innerText);
                    innerRef.current.focus();
                }
                break
            default:
                break;
        }
    }

    // Event emitted when user clicks a suggestion
    async function onClick(e) {
        const value = getStockSymbol(e.target.innerText);
        showSingleStock(value);
        resetSuggestions(e);
        innerRef.current.value = "";
        innerRef.current.focus();
    }

    // Flag active suggestions with classes so that we can use them in our application
    function SuggestionsListComponent() {
        return filteredSuggestions.length ? (
            <ul className={input_css.suggestions}>
                {filteredSuggestions.map((suggestion, index) => {
                    return (
                        <li
                            className={
                                index === Number(activeSuggestionIndex) ? input_css.suggestion_active : null
                            }
                            tabIndex={-1}
                            key={index}
                            onClick={onClick}
                        >
                            {suggestion}
                        </li>
                    );

                })}
            </ul>
        ) : (
            <div className={input_css.no_suggestions}>
                <em>Sorry, no suggestions available.</em>
            </div>
        );
    }


    return (
        <>
            <input
                placeholder={toggleStatus ? "Enter Company Name" : "Enter Stock Symbol"}
                ref={innerRef}
                className={input_css.input}
                type="text"
                onChange={toggleStatus ? onChangeByCompanyName : onChangeByCompanySymbol}
                // Use onKeyDown instead of onKeyPress because onKeyPress only works with printable characters
                onKeyDown={keyPress}
            />
            {showSuggestions && savedInput && <SuggestionsListComponent/>}
        </>
    );
};
