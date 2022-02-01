import {useState, useEffect } from "react";
import {useDispatch} from "react-redux";
import input_css from "../styles/components/suggestionInput.module.scss";

export default function SuggestionInput({suggestions, innerRef, showSingleStock}) {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [savedInput, setSavedInput] = useState("");
    const dispatch = useDispatch();


    useEffect(() => {
        if (activeSuggestionIndex === "") {
            innerRef.current.value = "";
        } else {
            innerRef.current.value = filteredSuggestions[activeSuggestionIndex];
        }
    }, [activeSuggestionIndex])


    function onChange(e) {
        const userInput = e.target.value;
        // Filter suggestions that don't contain the user's input
        const unLinked = suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        setSavedInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex("");
        setShowSuggestions(true);
    }

    // Highlight the next/previous item in suggestions list when arrow keys are pressed
    function keyPress(e) {
        switch (e.code) {
            case "ArrowUp":
                if (activeSuggestionIndex === "" && filteredSuggestions) {
                    setActiveSuggestionIndex(filteredSuggestions.length - 1);
                } else {
                    activeSuggestionIndex - 1 < 0 ?
                        setActiveSuggestionIndex(filteredSuggestions.length - 1) :
                        setActiveSuggestionIndex(activeSuggestionIndex - 1);
                }
                break;
            case "ArrowDown":
                if (activeSuggestionIndex === "" && filteredSuggestions) {
                    setActiveSuggestionIndex(0);
                } else {
                    activeSuggestionIndex + 1 > filteredSuggestions.length - 1 ?
                        setActiveSuggestionIndex(0) :
                        setActiveSuggestionIndex(activeSuggestionIndex + 1);
                }
                break;
            case "Enter":
                showSingleStock();
                innerRef.current.value = "";
                setFilteredSuggestions([]);
                setActiveSuggestionIndex("");
                setShowSuggestions(false);
                innerRef.current.focus();
                break
            default:
                break;
        }
    }

    // Event emitted when user clicks a suggestion
    async function onClick(e) {
        setFilteredSuggestions([]);
        setSavedInput(e.target.innerText);
        setActiveSuggestionIndex("");
        setShowSuggestions(false);
        try {
            const url = `https://zvvlvtt198.execute-api.us-east-2.amazonaws.com/v1?stock=${e.target.innerText}`;
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    dispatch({type: "newStock", incomingStock: data.body[0]})
                });
            innerRef.current.value = "";
            innerRef.current.focus();
        } catch (e) {
            console.log(e.message);
        }
    }

    // Flag active suggestions with classes so that we can use them in our application
    function SuggestionsListComponent() {
        return filteredSuggestions.length ? (
            <ul className={input_css.suggestions}>
                {filteredSuggestions.map((suggestion, index) => {
                    return (
                        <li
                            className={
                                index === activeSuggestionIndex && input_css.suggestion_active
                            }
                            key={suggestion}
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
                placeholder={"Enter Stock Symbol"}
                ref={innerRef}
                className={input_css.input}
                type="text"
                onChange={onChange}
                // Use onKeyDown instead of onKeyPress because onKeyPress only works with printable characters
                onKeyDown={keyPress}
            />
            {showSuggestions && savedInput && <SuggestionsListComponent/>}
        </>
    );
};
