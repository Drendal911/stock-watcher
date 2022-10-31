import './styles/App.css';
import StockCardLarge from "./components/StockCardLarge";
import Form from "./components/Form";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Modal from "./components/Modal";

function App() {

    return (
        <>
            <div className="App">
                <Header>
                    <h1>Stock Watcher</h1>
                </Header>
                <StockCardLarge/>
                <Form/>
                <Modal/>
                <Footer/>
            </div>
        </>
    );
}

export default App;
