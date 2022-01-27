import React from 'react'
import { AppRouter } from './Components/Routes/AppRouter'
import { store } from './store/store'
import { Provider } from 'react-redux';

export const Administracion = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}