
import { eventChannel } from 'redux-saga';
import { put, call, take, takeEvery, select } from 'redux-saga/effects';
import { tickerMapper } from '../mapping/ticker.mapper';
import { initialOrderBookMapper, bookUpdateMapper } from '../mapping/order.mapper';
import { initialTradeMapper, mapTradeUpdate } from '../mapping/trade.mapper';
import { orderBookMessage, unsubscribe } from '../constants/messges';
import { last } from 'lodash';

import {
    CHANNEL_INIT, CONNECTION, ERROR, DISCONNECTION,
    SEND, MESSAGE, TICKER_SUCCESS,
    ORDER_BOOK_INITIAL, ORDERBOOK_UPDATE,
    CHANNEL_TICKER, CHANNEL_ORDER,
    CHANNEL_TRADE, TRADE_INITIAL, TRADE_UPDATE,
    CHANGE_PRECISION, CHANNEL_ORDER_UNSUBSCRIBE,
    ORDER_BOOK_PRECISION, SOCKET_KILL, SOCKET_OPEN
} from '../actions';

let orderThrottle = 0;
let ws = new WebSocket("wss://api.bitfinex.com/ws/2");

export function* socketSaga() {
    yield [
        takeEvery(CHANNEL_INIT, webSocketsChannel),
        takeEvery(SEND, wsSend),
        takeEvery(CHANGE_PRECISION, changePrecision),
        takeEvery(SOCKET_KILL, killSocket),
        takeEvery(SOCKET_OPEN, openSocket)
    ];
}

function* killSocket() {
    yield ws.close();
    yield put({ type: DISCONNECTION });
}

function* openSocket() {
    ws = new WebSocket("wss://api.bitfinex.com/ws/2");
    yield put({ type: CHANNEL_INIT });
}

function* changePrecision(action) {
    var state = yield select();
    var symbol = state.ticker.symbol;
    var msg = orderBookMessage(symbol, `P${action.payload}`);
    yield put({ type: CHANNEL_ORDER_UNSUBSCRIBE });
    yield put({ type: ORDER_BOOK_PRECISION });
    yield put({ type: SEND, payload: unsubscribe(state.orders.channelId) });
    yield put({ type: SEND, payload: msg });
}

function* wsSend(action) {
    var state = yield select();
    if (state.socket.connected && action.payload) {
        ws.send(JSON.stringify(action.payload));
    }
}

function* webSocketsChannel() {
    const channel = yield call(createEventChannel);
    while (true) {
        const action = yield take(channel);
        yield handleMessage(action);
    }
}

function* createEventChannel() {
    return yield eventChannel(emit => {
        ws.onopen = () => {
            return emit({ type: CONNECTION, payload: { connected: true } });
        };
        ws.onmessage = (message) => {
            return emit({ type: MESSAGE, payload: JSON.parse(message.data) });
        };
        ws.onerror = (err) => {
            return emit({ type: ERROR, payload: err });
        }
        return () => {
            ws.close = () => {
                return emit({ type: CONNECTION, payload: { connected: false } });
            };
        };
    });
}


function* handleMessage(action) {
    if (action.payload.event !== 'error') {
        if (Array.isArray(last(action.payload))) {
            yield handleChannelMesages(action);
        } else {
            yield put({ type: action.type, payload: action.payload });
        }
        if (action.payload.event) {
            yield handleSubscriptionMessages(action);
        }

    } else {
        console.error('SOCKET ERROR', action.payload);
    }
}

const handleSubscriptionMessages = function* (action) {
    if (action.payload.event === 'subscribed' && action.payload.channel === 'ticker') {
        yield put({ type: CHANNEL_TICKER, payload: action.payload.chanId });
    }
    if (action.payload.event === 'subscribed' && action.payload.channel === 'book') {
        yield put({ type: CHANNEL_ORDER, payload: action.payload.chanId });
    }
    if (action.payload.event === "subscribed" && action.payload.channel === "trades") {
        yield put({ type: CHANNEL_TRADE, payload: action.payload.chanId });
    }
}

const handleChannelMesages = function* (action) {
    var state = yield select();
    var cloned = { ...state };
    if (last(action.payload).length === 10) {
        var ticker = tickerMapper(last(action.payload));
        yield put({ type: TICKER_SUCCESS, payload: ticker });
    }
    if (last(action.payload).length === 50) {
        var book = initialOrderBookMapper(last(action.payload));
        yield put({ type: ORDER_BOOK_INITIAL, payload: book });
    }
    if (last(action.payload).length === 3) {
        var bookState = { bids: cloned.orders.bids, asks: cloned.orders.asks };
        var payload = last(action.payload);
        var update = bookUpdateMapper(bookState, payload)
        orderThrottle += 1;
        if (orderThrottle > 30) {
            yield put({ type: ORDERBOOK_UPDATE, payload: update });
            orderThrottle = 0;
        }

    }
    if (last(action.payload).length === 30) {
        yield put({ type: TRADE_INITIAL, payload: initialTradeMapper(action.payload) });
    }
    if (action.payload.length === 3 && action.payload[1] === 'tu') {
        var tradeState = cloned.trades.trades;
        yield put({ type: TRADE_UPDATE, payload: mapTradeUpdate(action.payload[2], tradeState) });
    }
}