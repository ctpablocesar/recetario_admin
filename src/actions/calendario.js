import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { finishLoading, finishSavingSomething, startLoading, startSavingSomething } from "./ui"
import Swal from 'sweetalert2';
import { types } from "../types/types";
import { fileUpload } from "../helpers/fileUpload";

export const startLoadCalendario = () => {
    return async (dispatch) => {

        dispatch(startLoading())

        const resp = await fetchSinToken('cale')
        const body = await resp.json()

        const url = body.calendario[0].imagen

        if (body.ok) {
            dispatch(loadCalendario(url))
        }

        dispatch(finishLoading())

    }
}

const loadCalendario = (url) => ({
    type: types.loadCalendario,
    payload: url
})

export const saveCalendario = () => {
    return async (dispatch, getState) => {

        dispatch(startSavingSomething())

        const img = getState().calendario.active;

        const resp = await fetchConToken('cale/60e32f3e48a7a8112c6b3aba', { imagen: img }, 'PUT')
        const body = await resp.json()

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Calendario guardado exitosamente',
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

export const startUpload = (file) => {
    return async (dispatch) => {

        const guardado = await fileUpload(file);

        const { url } = guardado;

        dispatch(saveCalendarioActive(url))

    }
}

const saveCalendarioActive = (url) => ({
    type: types.saveCalendarioActive,
    payload: url
})