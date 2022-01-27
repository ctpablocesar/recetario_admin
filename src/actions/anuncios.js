import { types } from '../types/types'
import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { finishSavingSomething, startLoading, startSavingSomething } from './ui';
import { fileUpload } from '../helpers/fileUpload';

export const startLoadingAnuncios = () => {
    return async (dispatch) => {

        dispatch(startLoading())

        const resp = await fetchSinToken('anuncios');
        const body = await resp.json();

        if (body.ok) {
            dispatch(saveAnuncios(body.anuncios))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
        dispatch(finishSavingSomething())

    }
}

const saveAnuncios = (data) => ({
    type: types.saveAnuncios,
    payload: data
})

export const startUpload = (file) => {
    return async (dispatch) => {

        const guardado = await fileUpload(file);

        const { url, nombre } = guardado;

        dispatch(saveImageAnuncioActive(url, nombre))

    }
}

const saveImageAnuncioActive = (url, nombre) => ({
    type: types.saveImageAnuncioActive,
    payload: {
        url,
        nombre
    }
})

export const startSaveAnuncio = (titulo, descripcion, link) => {
    return async (dispatch, getState) => {

        dispatch(startSavingSomething())

        const { imagen, tituloImagen } = getState().anuncios.active;

        const resp = await fetchConToken('anuncios', { titulo: titulo, descripcion: descripcion, imagen: imagen, tituloImagen: tituloImagen, link: link }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Anuncio guardado exitosamente',
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

        dispatch(resetAnuncios())
        dispatch(finishSavingSomething())

    }
}

export const startDeleteAnuncio = (id) => {


    return async (dispatch) => {
        dispatch(startSavingSomething())

        const resp = await fetchConToken(`anuncios/${id}`, null, 'DELETE');
        const body = await resp.json();

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Anuncio eliminado exitosamente',
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

export const startUplaodAnuncio = (titulo, descripcion, link = '') => {
    return async (dispatch, getState) => {


        dispatch(startSavingSomething())

        const { id, tituloImagen, imagen } = getState().anuncios.active;

        const resp = await fetchConToken(`anuncios/${id}`, { titulo: titulo, descripcion: descripcion, tituloImagen: tituloImagen, imagen: imagen, link: link }, 'PUT');
        const body = await resp.json();

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Anuncio actualizado exitosamente',
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

        dispatch(resetAnuncios())
        dispatch(finishSavingSomething())

    }
}

export const changeStatusAnuncio = (id, status) => {
    return async (dispatch) => {

        dispatch(startSavingSomething())

        const resp = await fetchConToken(`anuncios/${id}`, { status: !status }, 'PUT')
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

export const startSetAnuncioActive = (anuncio) => ({
    type: types.setActiveAnuncio,
    payload: anuncio
})

export const resetAnuncios = () => ({ type: types.resetAnuncios })