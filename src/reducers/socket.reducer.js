
import { CONNECTION, ERROR, DISCONNECTION } from '../actions';

var initialState = { connected: false, error: null };

export const socketReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONNECTION:
            return { ...state, ...action.payload };
        case ERROR:
            return { ...state, error: action.payload.error };
        case DISCONNECTION:
            return { ...state, connected: false };
        default:
            return state;
    }
}