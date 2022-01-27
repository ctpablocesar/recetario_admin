import { types } from '../types/types'
import Swal from 'sweetalert2';
import { fetchConToken, fetchSinToken } from '../helpers/fetch';
import { finishLoading, finishSavingSomething, startLoading, startSavingSomething } from './ui';
import { fileUpload } from '../helpers/fileUpload';

export const startLoadingNoticias = () => {
    return async (dispatch) => {

        dispatch(startLoading())

        const resp = await fetchSinToken('noticias');
        const body = await resp.json();

        if (body.ok) {
            dispatch(saveNoticias(body.noticias))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
        dispatch(finishLoading())

    }
}

const saveNoticias = (data) => ({
    type: types.saveNoticias,
    payload: data
})

export const startUpload = (file) => {
    return async (dispatch) => {

        const guardado = await fileUpload(file);

        const { url, nombre } = guardado;

        dispatch(saveImageNoticiaActive(url, nombre))

    }
}

const saveImageNoticiaActive = (url, nombre) => ({
    type: types.saveImageNoticiaActive,
    payload: {
        url,
        nombre
    }
})

export const startSaveNoticia = (titulo, descripcion, link) => {
    return async (dispatch, getState) => {

        dispatch(startSavingSomething())

        const { imagen, tituloImagen } = getState().noticias.active;

        const resp = await fetchConToken('noticias', { titulo: titulo, descripcion: descripcion, imagen: imagen, tituloImagen: tituloImagen, link: link }, 'POST');
        const body = await resp.json();

        console.log(body)

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Noticia guardada exitosamente',
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
        dispatch(resetNoticias())
        dispatch(finishSavingSomething())

    }
}

export const startDeleteNoticia = (id) => {

    return async (dispatch) => {
        dispatch(startSavingSomething())

        const resp = await fetchConToken(`noticias/${id}`, null, 'DELETE');
        const body = await resp.json();

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Noticia eliminada exitosamente',
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

export const startUplaodNoticia = (titulo, descripcion, link = '') => {
    return async (dispatch, getState) => {

        dispatch(startSavingSomething())

        const { id, tituloImagen, imagen } = getState().noticias.active;

        const resp = await fetchConToken(`noticias/${id}`, { titulo: titulo, descripcion: descripcion, tituloImagen: tituloImagen, imagen: imagen, link: link }, 'PUT');
        const body = await resp.json();

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Noticia actualizada exitosamente',
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

        dispatch(resetNoticias())
        dispatch(finishSavingSomething())

    }
}

export const changeStatusNoticia = (id, status) => {
    return async (dispatch) => {

        dispatch(startSavingSomething())

        const resp = await fetchConToken(`noticias/${id}`, { status: !status }, 'PUT')
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

export const startSetNoticiaActive = (noticia) => ({
    type: types.setActiveNoticia,
    payload: noticia
})

export const resetNoticias = () => ({ type: types.resetNoticias })