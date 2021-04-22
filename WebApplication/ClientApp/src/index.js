import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import commonReducer from './store/reducers/commonReducer';
import authReducer from './store/reducers/authReducer';
import locationReducer from './store/reducers/locationReducer';
import hotelReducer from './store/reducers/hotelReducer';
import { watchAuth, watchLocation, watchHotel } from './store/sagas';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    common: commonReducer,
    auth: authReducer,
    location: locationReducer,
    hotel: hotelReducer,
});
const composeEnhancers = (process.env.NODE_ENV === 'developement' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
    (null || compose));
//const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk))); 
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchLocation);
sagaMiddleware.run(watchHotel);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
            <App />
        </BrowserRouter>
    </Provider>,
    rootElement);

registerServiceWorker();

