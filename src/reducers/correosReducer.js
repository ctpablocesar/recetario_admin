import { types } from '../types/types'

const initialState = {
    correos: [],
    active: []
}

export const correosReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.saveCorreos:
            return {
                ...state,
                correos: action.payload
            }
        case types.setEliminados:
            return {
                ...state,
                active: action.payload
            }

        default:
            return state
    }

}