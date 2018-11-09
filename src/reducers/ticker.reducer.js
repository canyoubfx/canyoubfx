
import { TICKER_SUCCESS, TICKER_REQUEST, TICKER_FAIL, CHANNEL_TICKER, CHANNEL_TICKER_UNSUBSCRIBE, TICKER_CHANGED } from '../actions';

var initialState = { isLoading: true, error: null, channelId: null, symbol: 'btcusd' };

export const tickerReducer = (state = initialState, action) => {
    switch (action.type) {
        case TICKER_CHANGED:
            return { ...state, symbol: action.payload }
        case TICKER_SUCCESS:
            return { ...state, ...action.payload, isLoading: false };
        case TICKER_REQUEST:
            return { ...state, isLoading: true }
        case TICKER_FAIL:
            return { ...state, error: action.payload, isLoading: false };
        case CHANNEL_TICKER_UNSUBSCRIBE:
            return { ...state, channelId: null };
        case CHANNEL_TICKER:
            return { ...state, channelId: action.payload };
        default:
            return state;
    }
}