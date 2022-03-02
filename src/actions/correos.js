import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';

export const getCorreos = () => {
    return async (dispatch) => {

        dispatch(startLoading());

        const resp = await fetchConToken('correo');
        const body = await resp.json();

        if (body.ok) {
            dispatch(saveCorreos(body.correos));
            let active = [];
            for (let i = 0; i < body.correos.length; i++) {
                active.push(
                    {
                        correo: body.correos[i],
                        status: false
                    }
                );
            }
            dispatch(setEliminados(active));
        } else {
            Swal.fire({
                icon: 'error',
                title: body.msg,
                showConfirmButton: false,
                timer: 1500
            });
        }

        dispatch(finishLoading());

    }
}

const saveCorreos = (correos) => ({
    type: types.saveCorreos,
    payload: correos
});

export const setCorreos = (correo) => {
    return (dispatch, getstate) => {

        dispatch(startLoading());

        const active = getstate().correos.active;

        active.map((item) => {
            if (item.correo === correo) {
                item.status = !item.status;
            }
        });

        dispatch(setEliminados(active));

        dispatch(finishLoading());

    }
}

const setEliminados = (correos) => ({
    type: types.setEliminados,
    payload: correos
})

export const enviarVarios = (asunto, mensaje) => {

    return async (dispatch, getstate) => {

        dispatch(startLoading());

        const active = getstate().correos.active;

        let correos = [];

        active.map((item) => {
            if (item.status) {
                correos.push(item.correo);
            }
        });

        if (!!correos[0]) {

            const resp = await fetchConToken('correo/varios', { emails: correos, asunto, mensaje }, 'POST');
            const body = await resp.json();

            if (body.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Correos enviados',
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: body.msg,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } else {

            Swal.fire({
                icon: 'error',
                title: 'No hay correos seleccionados',
                showConfirmButton: false,
                timer: 1500
            });

        }

        dispatch(finishLoading());

    }
}

export const enviarTodos = (asunto, mensaje) => {

    return async (dispatch, getstate) => {

        dispatch(startLoading());

        const resp = await fetchConToken('correo/todos', { asunto, mensaje }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Correos enviados',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: body.msg,
                showConfirmButton: false,
                timer: 1500
            });
        }

        dispatch(finishLoading());

    }

}