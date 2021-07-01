import { ResultCodeCaptchaEnum } from './../Api/Api';
import { ProfileType } from '../types/types';
import { GetActionsType, ThunkType } from './store';
import { AuthApi } from '../Api/Auth-api';
import { ResultCodeEnum } from '../Api/Api';
import { ProfileApi } from "../Api/Profile-api";
import { SecurityApi } from '../Api/security-api';
import { message } from 'antd';



const initialState = {
    isAuth: false,
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    authUserProfile: null as null | ProfileType,
    captchaUrl: null as null | string,
    errorMessage: null as null | string
}

export type InitialStateType = typeof initialState;
type ActionsType = GetActionsType<typeof actions>

export const AuthReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AU/AUTH_VERIFIED':
        case 'AU/AUTH_USER_RECEIVED':
        case 'AU/CAPTCHA_URL_IS_RECEIVED':
        case 'AU/AN_ERROR_HAS_OCCURRED':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}


export const actions = {
    authVerified: (id: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({ type: 'AU/AUTH_VERIFIED', payload: { email, login, id, isAuth } } as const),
    authUserReceived: (authUserProfile: ProfileType) =>
        ({ type: 'AU/AUTH_USER_RECEIVED', payload: { authUserProfile } } as const),
    captchaUrlIsReceived: (captchaUrl: string | null) =>
        ({ type: 'AU/CAPTCHA_URL_IS_RECEIVED', payload: { captchaUrl } } as const),
    AnErrorHasOccurred: (errorMessage: string | null) =>
        ({ type: 'AU/AN_ERROR_HAS_OCCURRED', payload: { errorMessage } } as const),
}


export const authMe = (): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            const data = await AuthApi.authMe()
            if (data.resultCode === ResultCodeEnum.success) {
                const { id, login, email } = data.data
                dispatch(actions.authVerified(id, login, email, true))
            }
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}

export const getAuthUser = (): ThunkType<ActionsType> => {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const userId = state.auth.id
            if (userId) {
                const data = await ProfileApi.getUser(userId)
                dispatch(actions.authUserReceived(data))
            }
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}

export const login = (email: string, Password: string, rememberMe: boolean, captcha: string): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            const data = await AuthApi.login(email, Password, rememberMe, captcha)
            if (data.resultCode === ResultCodeEnum.success) {
                dispatch(authMe())
                dispatch(actions.captchaUrlIsReceived(null))
                dispatch(actions.AnErrorHasOccurred(null))
            } else if (data.resultCode === ResultCodeCaptchaEnum.captcha) {
                dispatch(actions.AnErrorHasOccurred(data.messages[0]))
                dispatch(getCaptchaUrl())
            } else {
                dispatch(actions.AnErrorHasOccurred(data.messages[0]))
            }
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}

export const logout = (): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            const data = await AuthApi.logout()
            if (data.resultCode === ResultCodeEnum.success) {
                dispatch(actions.authVerified(null, null, null, false))
            }
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}


export const getCaptchaUrl = (): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            const data = await SecurityApi.getCaptchaUrl()
            dispatch(actions.captchaUrlIsReceived(data.url))
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}
