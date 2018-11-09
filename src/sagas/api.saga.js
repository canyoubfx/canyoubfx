import { put, call, takeEvery, select } from 'redux-saga/effects';
import { getTicker, getSymbols } from '../api/bfx.api'
import { sortBy } from 'lodash';
import { tickerMessage, orderBookMessage, unsubscribe, tradeMessage } from '../constants/messges';
import {
    TICKER_REQUEST, TICKER_SUCCESS, TICKER_FAIL,
    SYMBOLS_REQUEST, SYMBOLS_SUCCESS, SYMBOLS_FAIL, SEND,
    ORDERBOOK_RESET, CHANNEL_TICKER_UNSUBSCRIBE, CHANNEL_ORDER_UNSUBSCRIBE,
    CHANNEL_TRADE_UNSUBSCRIBE, TRADE_RESET, TICKER_CHANGED
} from '../actions';

export function* tickerSaga() {
    yield takeEvery(TICKER_REQUEST, function* (data) {
        const { payload } = data;
        yield handleTickerRequestSocket(payload);
    });
}

const handleTickerRequestSocket = function* (payload) {
    try {
        var state = yield select();
        var response = yield call(getTicker, payload);
        yield put({type : TICKER_CHANGED, payload})
        yield put({ type: TICKER_SUCCESS, payload: response.data });
        yield put({ type: ORDERBOOK_RESET });
        yield put({ type: TRADE_RESET });
        if (state.ticker.channelId) {
            yield put({ type: CHANNEL_TICKER_UNSUBSCRIBE });
            yield put({ type: SEND, payload: unsubscribe(state.ticker.channelId) });
        }
        if (state.orders.channelId) {
            yield put({ type: CHANNEL_ORDER_UNSUBSCRIBE });
            yield put({ type: SEND, payload: unsubscribe(state.orders.channelId) });
        }
        if (state.trades.channelId) {
            yield put({ type: CHANNEL_TRADE_UNSUBSCRIBE });
            yield put({ type: SEND, payload: unsubscribe(state.trades.channelId) });
        }
        yield put({ type: SEND, payload: tickerMessage(payload) });
        yield put({ type: SEND, payload: orderBookMessage(payload, 'P0') });
        yield put({ type: SEND, payload: tradeMessage(payload) })
    } catch (e) {
        yield put({ type: TICKER_FAIL, e });
    }
}

export function* symbolsSaga() {
    yield takeEvery(SYMBOLS_REQUEST, function* () {
        try {
            var response = yield call(getSymbols);
            var symbols = sortBy(response.data)
            yield put({ type: SYMBOLS_SUCCESS, payload: symbols });
        } catch (e) {
            yield put({ type: SYMBOLS_FAIL, e });
        }
    });
}