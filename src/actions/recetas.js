import { types } from '../types/types'
import Swal from 'sweetalert2';
import { fetchConToken } from '../helpers/fetch';
import { finishSavingSomething, startLoading, startSavingSomething } from './ui';
import { fileUpload } from '../helpers/fileUpload';

export const startLoadingRecetas = () => {
    return async (dispatch, getState) => {

        dispatch(startLoading())

        const uid = getState().auth.uid;
        const rol = getState().auth.rol.toString();

        console.log(rol);

        const resp = rol === 'admin' ? await fetchConToken(`recetas/`, uid) : await fetchConToken(`recetasPorUsuario/${uid}`);
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

export const startSaveReceta = (value, tiempo, ocacion, uid) => {
    return async (dispatch) => {

        dispatch(startSavingSomething())

        const { titulo, descripcion, ingredientes, procedimiento } = value;

        // console.log(
        //     titulo,
        //     descripcion,
        //     ingredientes,
        //     tiempo,
        //     procedimiento,
        //     ocacion,
        //     uid
        // );

        const resp = await fetchConToken('recetas', {
            titulo,
            descripcion,
            ingredientes,
            tiempo,
            procedimiento,
            ocacion,
            uid
        }, 'POST');
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

export const startDeleteReceta = (id,uid) => {

    return async (dispatch) => {

        console.log(id,uid);

        dispatch(startSavingSomething())

        const resp = await fetchConToken(`recetas/${id}/${uid}`,'', 'DELETE');
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

export const startUplaodReceta = (value, uid) => {
    return async (dispatch, getState) => {


        dispatch(startSavingSomething())

        const { tiempo, id } = getState().recetas.active;

        console.log(uid);

        const {
            titulo,
            descripcion,
            ingredientes,
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

export const changeStatusReceta = (id, status, uid) => {
    return async (dispatch) => {

        dispatch(startSavingSomething())

        const resp = await fetchConToken(`recetas/${id}`, { status: !status, uid }, 'PUT')
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