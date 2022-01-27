import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"
import Swal from 'sweetalert2';
import { finishLoading, finishSavingSomething, startLoading, startSavingSomething } from "./ui";
import { fileUpload } from '../helpers/fileUpload';


export const startLoadingFrase = () => {
    return async (dispatch) => {

        dispatch(startLoading())
        dispatch(finishLoading())

        const resp = await fetchSinToken('frase')
        const body = await resp.json()

        const { titulo, frase, imagen } = body.frase[0]

        const fraseN = {
            titulo,
            frase,
            imagen
        }

        if (body.ok) {
            dispatch(saveFrase(fraseN))
        } else {
            Swal.fire({
                icon: 'error',
                title: body.msg,
                showConfirmButton: false,
                timer: 1500
            })
        }

    }
}

const saveFrase = (frase) => ({
    type: types.saveFrase,
    payload: frase
})

export const startUpload = (file) => {
    return async (dispatch) => {

        const guardado = await fileUpload(file);

        const { url, nombre } = guardado;

        dispatch(setImageActive(url, nombre))

    }
}

const setImageActive = (url, nombre) => ({
    type: types.setImageActive,
    payload: url, nombre
})

export const uploadFrase = (tituloForm, contenido) => {
    return async (dispatch, getState) => {

        console.log(tituloForm)
        console.log(contenido)

        dispatch(startSavingSomething())

        const url = getState().frase.active

        const resp = await fetchConToken(`frase/60f5962a7ca79000151452d4`, { imagen: url, titulo: tituloForm, frase: contenido }, 'PUT')
        const body = await resp.json()

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Frase actualizada con éxito',
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