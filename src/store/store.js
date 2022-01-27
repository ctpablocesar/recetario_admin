import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { authReducer } from '../reducers/authReducer'
import thunk from 'redux-thunk'
import { uiReducer } from '../reducers/uiReducer';
import { anunciosReducer } from '../reducers/anunciosReducer';
import { noticiasReducer } from '../reducers/noticiasReducer';
import { galeriaReducer } from '../reducers/galeriaReducer';
import { contactoReducer } from '../reducers/contactoReducer';
import { calendarioReducer } from '../reducers/calendarioReducer';
import { fraseReducer } from '../reducers/fraseReducer';

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    anuncios: anunciosReducer,
    noticias: noticiasReducer,
    galeria: galeriaReducer,
    contacto: contactoReducer,
    calendario: calendarioReducer,
    frase: fraseReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);