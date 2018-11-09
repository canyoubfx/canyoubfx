
import { SYMBOLS_FAIL, SYMBOLS_SUCCESS, SYMBOLS_REQUEST } from '../actions';

var initialState = { symbols: [], isLoading: false };

export const symbolsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SYMBOLS_REQUEST:
            return { ...state, isLoading: true }
        case SYMBOLS_SUCCESS:
            return { ...state, symbols: action.payload, isLoading: false };
        case SYMBOLS_FAIL:
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
}