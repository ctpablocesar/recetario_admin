import { types } from '../types/types'

export const startLoading = () => ({ type: types.startLoading })
export const finishLoading = () => ({ type: types.finishLoading })
export const startSavingSomething = () => ({ type: types.startSaveSomething })
export const finishSavingSomething = () => ({ type: types.finishSaveSomething })