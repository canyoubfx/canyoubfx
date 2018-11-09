import { all, fork } from 'redux-saga/effects';
import { socketSaga } from './socket.saga';
import { tickerSaga, symbolsSaga } from './api.saga';

export default function* rootSaga() {
    yield all([
        fork(socketSaga),
        fork(tickerSaga),
        fork(symbolsSaga)
    ]);
}