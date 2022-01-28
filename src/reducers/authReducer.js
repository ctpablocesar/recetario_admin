import { types } from '../types/types'

const initialState = {
    uid: '',
    rol: ''
}

export const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                rol: action.payload.rol
            }

        case types.logout:
            return {
                checking: false
            }

        default:
            return state
    }

}