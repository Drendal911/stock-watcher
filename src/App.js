import './styles/App.css';
import StockCardLarge from "./components/StockCardLarge";
import Form from "./components/Form";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import backgroundVideo from './numbersOnScreen.mp4'

function App() {

    return (
        <>
            <video autoPlay loop muted className={"video"}>
                <source src={backgroundVideo} type={"video/mp4"}/>
            </video>
            <div className="App">
                <Header>
                    <h1>Stock Watcher</h1>
                </Header>
                <StockCardLarge/>
                <Form/>
                <Footer/>
            </div>
        </>
    );
}

export default App;
