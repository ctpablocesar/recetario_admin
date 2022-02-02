import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"
import Swal from 'sweetalert2';
import { finishLoading, finishSavingSomething, startLoading, startSavingSomething } from "./ui"

export const startLoadingMensajes = () => {
    return async (dispatch,getState) => {

        const uid = getState().auth.uid;

        dispatch(startLoading())

        const resp = await fetchConToken(`contacto/${uid}`);
        const body = await resp.json()

        console.log(body);

        if (body.ok) {
            dispatch(saveMensajes(body.contacto))
        } else {
            Swal.fire({
                icon: 'error',
                title: body.msg,
                showConfirmButton: false,
                timer: 1500
            })
        }

        dispatch(finishLoading())

    }
}

const saveMensajes = (mensajes) => ({
    type: types.saveMensajes,
    payload: mensajes
})

export const deleteMensaje = (id) => {
    return async (dispatch) => {

        dispatch(startSavingSomething())

        const resp = await fetchConToken(`contacto/${id}`, '', 'DELETE')
        const body = await resp.json()

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Mensaje eliminado exitosamente',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: body.msg,
                showConfirmButton: false,
                timer: 1500
            })
        }

        dispatch(finishSavingSomething())
    }
}