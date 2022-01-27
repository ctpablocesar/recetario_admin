import { types } from '../types/types'

const initialState = {
    checking: false,
    saving: false
}

export const uiReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.startLoading:
            return {
                ...state,
                checking: true,
            }

        case types.finishLoading:
            return {
                ...state,
                checking: false
            }
        case types.startSaveSomething:
            return {
                ...state,
                saving: true
            }
        case types.finishSaveSomething:
            return {
                ...state,
                saving: false
            }
        default:
            return state
    }

}