import { types } from '../types/types'
import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { finishSavingSomething, startLoading, startSavingSomething } from './ui';
import { fileUpload } from '../helpers/fileUpload';

export const startLoadingRecetas = () => {
    return async (dispatch, getState) => {

        dispatch(startLoading())

        const uid = getState().auth.uid;
        const rol = getState().auth.rol;

        const resp = rol === 'user' ? await fetchConToken(`recetas/admin/${uid}`) : await fetchConToken(`recetas`);
        const body = await resp.json();

        if (body.ok) {
            dispatch(saveRecetas(body.recetas))
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
        dispatch(finishSavingSomething())

    }
}

const saveRecetas = (data) => ({
    type: types.saveRecetas,
    payload: data
})

// export const startUpload = (file) => {
//     return async (dispatch) => {

//         const guardado = await fileUpload(file);

//         const { url, nombre } = guardado;

//         dispatch(saveImageRecetaActive(url, nombre))

//     }
// }

// const saveImageRecetaActive = (url, nombre) => ({
//     type: types.saveImageAnuncioActive,
//     payload: {
//         url,
//         nombre
//     }
// })

export const startSaveReceta = (titulo, descripcion, link) => {
    return async (dispatch, getState) => {

        dispatch(startSavingSomething())

        const { imagen, tituloImagen } = getState().anuncios.active;

        const resp = await fetchConToken('recetas', { titulo: titulo, descripcion: descripcion, imagen: imagen, tituloImagen: tituloImagen, link: link }, 'POST');
        const body = await resp.json();

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Receta guardado exitosamente',
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

        dispatch(resetRecetas())
        dispatch(finishSavingSomething())

    }
}

export const startDeleteReceta = (data) => {

    const {uid, id} = data;

    return async (dispatch) => {
        dispatch(startSavingSomething())

        const resp = await fetchConToken(`anuncios/${id}`, uid, 'DELETE');
        const body = await resp.json();

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Receta eliminado exitosamente',
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

export const startUplaodReceta = (value) => {
    return async (dispatch, getState) => {


        dispatch(startSavingSomething())

        const { id } = getState().recetas.active;
        const { uid } = getState().auth.uid;

        const {
            titulo,
            descripcion,
            ingredientes,
            tiempo,
            procedimiento,
            etiquetas,
            tipo,
            ocacion
        } = value;

        const resp = await fetchConToken(`recetas/${id}`, {
            titulo,
            descripcion,
            ingredientes,
            tiempo,
            procedimiento,
            etiquetas,
            tipo,
            ocacion,
            uid
        }, 'PUT');
        const body = await resp.json();

        if (body.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Receta actualizada exitosamente',
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

        dispatch(resetRecetas())
        dispatch(finishSavingSomething())

    }
}

export const changeStatusReceta = (id, status) => {
    return async (dispatch) => {

        dispatch(startSavingSomething())

        const resp = await fetchConToken(`recetas/${id}`, { status: !status }, 'PUT')
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

export const startSetRecetaActive = (receta) => ({
    type: types.setActiveReceta,
    payload: receta
})

export const resetRecetas = () => ({ type: types.resetAnuncios })