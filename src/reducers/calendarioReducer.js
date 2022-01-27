import { types } from '../types/types'

const initialState = {
    calendario: '',
    active: ''
}

export const calendarioReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.loadCalendario:
            return {
                ...state,
                calendario: action.payload
            }
        case types.saveCalendarioActive:
            return {
                ...state,
                active: action.payload
            }

        default:
            return state
    }

}