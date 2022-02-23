import Swal from 'sweetalert2';

import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types"
import { finishLoading, finishSavingSomething, startLoading, startSavingSomething } from "./ui"
import { fileUpload } from '../helpers/fileUpload';

export const startLoadingImages = () => {
    return async (dispatch) => {

        dispatch(startLoading())

        const resp = await fetchSinToken('galeria')
        const body = await resp.json()

        if (body.ok) {
            dispatch(saveImages(body.galeria))
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

const saveImages = (data) => ({
    type: types.saveImages,
    payload: data
})

export const startUpload = (file) => {
    return async (dispatch) => {

        const guardado = await fileUpload(file);

        const { url, nombre } = guardado;

        dispatch(saveImageImageActive(url, nombre))

    }
}

const saveImageImageActive = (url, nombre) => ({
    type: types.saveActiveImage,
    payload: {
        url,
        nombre
    }
})

export const startSavingImage = (data) => {

    return async (dispatch, getstate) => {

        dispatch(startSavingSomething())

        const { imagen, tituloImagen } = getstate().galeria.active;

        const resp = await fetchConToken('galeria', { imagen: imagen, titulo: tituloImagen }, 'POST')
        const body = await resp.json()

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Imagen guardada con éxito',
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

        dispatch(resetActiveImage());

        dispatch(finishSavingSomething())

    }
}

export const resetActiveImage = () => ({ type: types.resetActiveImage })

export const changeStatusGaleria = (id, status) => {
    return async (dispatch) => {

        dispatch(startSavingSomething())

        const resp = await fetchConToken(`galeria/${id}`, { status: !status }, 'PUT')
        const body = await resp.json()

        if (!body.ok) {
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

export const startDeleteGaleria = (id) => {
    return async (dispatch) => {

        dispatch(startSavingSomething())

        const resp = await fetchConToken(`galeria/${id}`, '', 'DELETE')
        const body = await resp.json()

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Imagen eliminada exitosamente',
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