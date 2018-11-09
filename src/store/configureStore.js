import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from "../reducers/rootReducer";
import rootSaga from '../sagas/root.saga';
import logger from 'redux-logger';

export default function configureStore(preloadedState) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, logger];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancers = [middlewareEnhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()];
    const composedEnhancer = compose(...storeEnhancers);

    const store = createStore(
        rootReducer,
        preloadedState,
        composedEnhancer
    );

    sagaMiddleware.run(rootSaga);

    return store;
}