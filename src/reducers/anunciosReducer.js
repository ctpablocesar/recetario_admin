import { types } from '../types/types'

const initialState = {
    anuncios: [],
    active: {}
}

export const anunciosReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.saveAnuncios:
            return {
                ...state,
                anuncios: action.payload
            }
        case types.saveImageAnuncioActive:
            return {
                ...state,
                active: {
                    ...state.active,
                    imagen: action.payload.url,
                    tituloImagen: action.payload.nombre
                }
            }
        case types.resetAnuncios:
            return {
                ...state,
                active: {
                    imagen: '',
                    tituloImagen: ''
                }
            }
        case types.setActiveAnuncio:
            return {
                ...state,
                active: action.payload
            }
        default:
            return state
    }

}