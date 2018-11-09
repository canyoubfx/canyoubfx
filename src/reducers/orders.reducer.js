
import { ORDERBOOK_UPDATE, ORDER_BOOK_INITIAL, 
    ORDERBOOK_RESET,  ORDER_BOOK_PRECISION,
    CHANNEL_ORDER_UNSUBSCRIBE, CHANNEL_ORDER } from '../actions';

var initialState = { isLoading: true, error: null, bids: {}, asks: {}, channelId: null };

export const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case ORDERBOOK_UPDATE:
        return { ...state, bids: action.payload.bids, asks: action.payload.asks };
        case ORDER_BOOK_INITIAL:
            return { ...state, bids: action.payload.bids, asks: action.payload.asks, isLoading: false };
        case ORDERBOOK_RESET:
            return { ...state, isLoading: true, bids : {}, asks : {} }
        case CHANNEL_ORDER_UNSUBSCRIBE:
            return { ...state, channelId: null };
        case CHANNEL_ORDER:
            return { ...state, channelId: action.payload };
        case ORDER_BOOK_PRECISION :
            return {...state, isLoading: true}
        default:
            return state;
    }
}