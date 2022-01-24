import './styles/App.css';
import StockCardLarge from "./components/StockCardLarge";
import Form from "./components/Form";
import Header from "./components/layout/Header";

function App() {
    return (
        <div className="App">
            <Header>
                <h1>Stock Watcher</h1>
            </Header>
                <StockCardLarge/>
            <Form/>
        </div>
    );
}

export default App;
