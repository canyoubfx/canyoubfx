import { combineReducers } from "redux";
import { orderReducer } from './orders.reducer';
import { socketReducer } from './socket.reducer';
import { symbolsReducer } from './symbols.reducer';
import { tickerReducer } from './ticker.reducer';
import { tradeReducer } from './trades.reducer';

const rootReducer = combineReducers({
    socket: socketReducer,
    ticker: tickerReducer,
    symbols: symbolsReducer,
    orders: orderReducer,
    trades : tradeReducer
});

export default rootReducer;