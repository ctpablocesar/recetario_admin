import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { authReducer } from '../reducers/authReducer'
import thunk from 'redux-thunk'
import { uiReducer } from '../reducers/uiReducer';
import { recetasReducer } from '../reducers/recetasReducer';
import { contactoReducer } from '../reducers/contactoReducer';

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    contacto: contactoReducer,
    recetas: recetasReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);