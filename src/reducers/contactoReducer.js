import { types } from '../types/types'

const initialState = {
    mensajes: []
}

export const contactoReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.saveMensajes:
            return {
                ...state,
                mensajes: action.payload
            }
        default:
            return state
    }

}