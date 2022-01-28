import { types } from '../types/types'

const initialState = {
    recetas: [],
    active: {}
}

export const recetasReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.saveRecetas:
            return {
                ...state,
                recetas: action.payload
            }
        case types.saveImageRecetaActive:
            return {
                ...state,
                active: {
                    ...state.active,
                    imagen: action.payload.url,
                    tituloImagen: action.payload.nombre
                }
            }
        case types.resetRecetas:
            return {
                ...state,
                active: {
                    imagen: '',
                    tituloImagen: ''
                }
            }
        case types.setActiveReceta:
            return {
                ...state,
                active: action.payload
            }
        default:
            return state
    }

}