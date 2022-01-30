import { createStore } from 'redux';

const stockInitialState = {
    symbol: "",
    name: "",
    price: 0,
    changesPercentage: 0,
    change: 0,
    dayLow: 0,
    dayHigh: 0,
    open: 0,
    previousClose: 0,
    showModal: false,
    modalText: "",
    loadingSuggestions: true
}

function stockReducer(stock = stockInitialState, action) {
    if(action.type === 'newStock') {
        return {
            symbol: action.incomingStock.symbol,
            name: action.incomingStock.name,
            price: action.incomingStock.price.toFixed(2),
            changesPercentage: action.incomingStock.changesPercentage.toFixed(2) + "%",
            change: action.incomingStock.change.toFixed(2),
            dayLow: action.incomingStock.dayLow.toFixed(2),
            dayHigh: action.incomingStock.dayHigh.toFixed(2),
            open: action.incomingStock.open.toFixed(2),
            previousClose: action.incomingStock.previousClose.toFixed(2),
            showModal: stock.showModal,
            modalText: stock.modalText,
            loadingSuggestions: stock.loadingSuggestions
        };
    }
    if(action.type === 'modal') {
        return {
            symbol: stock.symbol,
            name: stock.name,
            price: stock.price,
            changesPercentage: stock.changesPercentage,
            change: stock.change,
            dayLow: stock.dayLow,
            dayHigh: stock.dayHigh,
            open: stock.open,
            previousClose: stock.previousClose,
            showModal: action.incModal.showModal,
            modalText: action.incModal.modalText,
            loadingSuggestions: stock.loadingSuggestions
        };
    }
    if(action.type === 'loading') {
        return {
            symbol: stock.symbol,
            name: stock.name,
            price: stock.price,
            changesPercentage: stock.changesPercentage,
            change: stock.change,
            dayLow: stock.dayLow,
            dayHigh: stock.dayHigh,
            open: stock.open,
            previousClose: stock.previousClose,
            showModal: stock.showModal,
            modalText: stock.modalText,
            loadingSuggestions: action.loadingSuggestions
        };
    }
    return stock;
}


const store = createStore(stockReducer);
export default store;