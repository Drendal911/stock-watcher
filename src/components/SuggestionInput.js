import {useState} from "react";
import {useDispatch} from "react-redux";
import input_css from "../styles/components/input.module.scss";

export default function SuggestionInput({ suggestions, innerRef, showSingleStock }) {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [savedInput, setSavedInput] = useState("");
    const dispatch = useDispatch();


    function onChange(e) {
        const userInput = e.target.value;

        // Filter suggestions that don't contain the user's input
        const unLinked = suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setSavedInput(e.target.value);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    }


    // Highlight the next/previous item in suggestions list when arrow keys are pressed
    function keyPress(e) {
        switch (e.code) {
            case "ArrowUp":
                setActiveSuggestionIndex(activeSuggestionIndex - 1);
                break;
            case "ArrowDown":
                setActiveSuggestionIndex(activeSuggestionIndex + 1);
                break;
            case "Enter":
                showSingleStock();
                innerRef.current.value = "";
                innerRef.focus();
                break
            default:
                break;

        }
    }

    // Event emitted when user clicks a suggestion
    async function onClick (e) {
        setFilteredSuggestions([]);
        setSavedInput(e.target.innerText);
        setActiveSuggestionIndex(0);
        setShowSuggestions(false);

        try {
            const url = `https://zvvlvtt198.execute-api.us-east-2.amazonaws.com/v1?stock=${e.target.innerText}`;
            await fetch(url)
                .then(response => response.json())
                .then(data => {
                    dispatch({type: "newStock", incomingStock: data.body[0]})
                });
            innerRef.current.value = "";
        } catch (e) {
            console.log(e.message);
        }

    };

    // Flag active suggestions with classes so that we can use them in our application
    function SuggestionsListComponent() {
        return filteredSuggestions.length ? (
            <ul className={input_css.suggestions}>
                {filteredSuggestions.map((suggestion, index) => {
                    let classname;
                    // Flag the active suggestion with a class
                    if (index === activeSuggestionIndex) {
                        classname = "inputCSS.suggestion_active";
                    }
                    return (
                        <li className={classname} key={suggestion} onClick={onClick}>
                            { suggestion }
                        </li>
                    );
                })}
            </ul>
        ) : (
            <div className={input_css.no_suggestions}>
                <em>Sorry, there are no matching suggestions.</em>
            </div>
        );
    }


    return (
        <>
            <input
                placeholder={"Enter Stock Ticker"}
                ref={innerRef}
                className={input_css.input}
                type="text"
                onChange={onChange}
                // Use onKeyDown instead of onKeyPress because onKeyPress only works with printable characters
                onKeyDown={keyPress}
            />
            {showSuggestions && savedInput && <SuggestionsListComponent />}
        </>
    );
};
