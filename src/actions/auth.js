import { types } from '../types/types'
import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';

export const startLogin = (email, password) => {
    return async (dispatch) => {

        const resp = await fetchSinToken('auth', { email, password }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(Login({
                uid: body.uid
            }))

            Swal.fire({
                icon: 'success',
                title: 'Inicio de sesión exitoso',
                showConfirmButton: false,
                timer: 1500
            })


        } else {
            Swal.fire('Error', body.msg, 'error');
        }
    }
}

const Login = (user) => ({
    type: types.login,
    payload: user
});

export const startChecking = () => {
    return async (dispatch) => {

        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();

        if (body.ok) {
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(Login({
                uid: body.uid
            }))
        } else {
            dispatch(checkingFinish());
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startLogout = () => {
    return (dispatch) => {

        localStorage.clear();
        dispatch(logout());
    }
}

const logout = () => ({ type: types.logout })