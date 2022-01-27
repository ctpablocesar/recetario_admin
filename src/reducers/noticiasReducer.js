import { types } from '../types/types'

const initialState = {
    noticias: [],
    active: {}
}

export const noticiasReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.saveNoticias:
            return {
                ...state,
                noticias: action.payload
            }
        case types.saveImageNoticiaActive:
            return {
                ...state,
                active: {
                    ...state.active,
                    tituloImagen: action.payload.nombre,
                    imagen: action.payload.url
                }
            }
        case types.resetNoticias:
            return {
                ...state,
                active: {
                    imagen: '',
                    tituloImagen: ''
                }
            }
        case types.setActiveNoticia:
            return {
                ...state,
                active: action.payload
            }
        default:
            return state
    }

}