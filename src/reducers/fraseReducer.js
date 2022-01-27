import { types } from '../types/types'

const initialState = {
    frase: {},
    active: {}
}

export const fraseReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.saveFrase:
            return {
                ...state,
                frase: action.payload
            }
        case types.setImageActive:
            return {
                ...state,
                active: action.payload
            }
        default:
            return state
    }

}