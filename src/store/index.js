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
    previousClose: 0
}

const indexInitialState = {
    dow: {

    },
    SP: {

    },
    nasdaq: {

    },
    nyse: {

    }
}

function majorIndexReducer(index = indexInitialState, action) {


    return index;
}

function stockReducer(stock = stockInitialState, action) {
    if (action.type === 'newStock') {
        return {
            symbol: action.incomingStock.symbol,
            name: action.incomingStock.name,
            price: action.incomingStock.price.toFixed(2),
            changesPercentage: action.incomingStock.changesPercentage.toFixed(2),
            change: action.incomingStock.change.toFixed(2),
            dayLow: action.incomingStock.dayLow.toFixed(2),
            dayHigh: action.incomingStock.dayHigh.toFixed(2),
            open: action.incomingStock.open.toFixed(2),
            previousClose: action.incomingStock.previousClose.toFixed(2)
        };
    }
    return stock;
}

const store = createStore(stockReducer);

export default store;
