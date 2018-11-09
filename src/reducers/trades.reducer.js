
import { TRADE_UPDATE, TRADE_INITIAL, TRADE_RESET, CHANNEL_TRADE_UNSUBSCRIBE, CHANNEL_TRADE } from '../actions';

var initialState = { isLoading: true, error: null, trades: [], channelId: null };

export const tradeReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRADE_UPDATE:
            return { ...state, trades: action.payload };
        case TRADE_INITIAL:
            return { ...state, trades: action.payload, isLoading: false };
        case TRADE_RESET:
            return { ...state, isLoading: true, trades: [] }
        case CHANNEL_TRADE_UNSUBSCRIBE:
            return { ...state, channelId: null };
        case CHANNEL_TRADE:
            return { ...state, channelId: action.payload };
        default:
            return state;
    }
}