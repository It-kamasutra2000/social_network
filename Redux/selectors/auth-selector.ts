import { StateType } from './../store';

export const selectUserId = (state: StateType) => {
    return state.auth.id
}

export const selectIsAuth = (state: StateType) => {
    return state.auth.isAuth
}

export const selectAuthUserProfile = (state: StateType) => {
    return state.auth.authUserProfile
}


export const selectCaptchaUrl = (state: StateType) => {
    return state.auth.captchaUrl
}

export const selectErrorMessage = (state: StateType) => {
    return state.auth.errorMessage
}
