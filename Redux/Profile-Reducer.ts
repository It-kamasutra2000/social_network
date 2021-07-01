import { IconType } from 'react-icons/lib';
import { getAuthUser } from './auth-Reducer';
import { ProfileApi } from './../Api/Profile-api';
import { GetActionsType, ThunkType } from './store';
import { PhotosType, ProfileType } from '../types/types';
import { ResultCodeEnum } from '../Api/Api';
import { message } from 'antd';
import { AiFillFacebook, AiFillGithub, AiFillInstagram, AiOutlineTwitter, AiFillYoutube } from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';
import { BiConfused } from 'react-icons/bi';



const initialState = {
    profile: null as null | ProfileType,
    status: '' as string,
    isFetching: false,
    isLoading: false,
    updateProfileStatus: null as null | UpdateProfileStatusType,
    icons: {
        facebook: AiFillFacebook,
        website: CgWebsite,
        vk: BiConfused,
        github: AiFillGithub,
        instagram: AiFillInstagram,
        twitter: AiOutlineTwitter,
        youtube: AiFillYoutube,
        mainLink: BiConfused,
    } as {[key: string]: IconType}
}

type UpdateProfileStatusType = 'ready' | 'pending' | 'error';
export type InitialStateType = typeof initialState;
type ActionsType = GetActionsType<typeof actions>

export const ProfileReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'PR/STATUS_RECEIVED':
        case 'PR/SET_IS_FETCHING':
        case 'PR/PHOTOS_IS_LOADED':
        case 'PR/SET_UPDATE_PROFILE_STATUS':
            return {
                ...state,
                ...action.payload
            }
        case 'PR/PHOTOS_RECEIVED':
            return {
                ...state,
                profile: { ...state.profile, photos: action.payload.photos } as ProfileType
            }
        case 'PR/PROFILE_RECEIVED':
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state
    }
}


export const actions = {
    usersReceived: (profile: ProfileType) => ({ type: 'PR/PROFILE_RECEIVED', payload: profile } as const),
    statusReceived: (status: string) => ({ type: 'PR/STATUS_RECEIVED', payload: { status } } as const),
    setIsFetching: (isFetching: boolean) => ({ type: 'PR/SET_IS_FETCHING', payload: { isFetching } } as const),
    photosReceived: (photos: PhotosType) => ({ type: 'PR/PHOTOS_RECEIVED', payload: { photos } } as const),
    photosILoaded: (isLoading: boolean) => ({ type: 'PR/PHOTOS_IS_LOADED', payload: { isLoading } } as const),
    setUpdateProfileStatus: (updateProfileStatus: UpdateProfileStatusType) =>
        ({ type: 'PR/SET_UPDATE_PROFILE_STATUS', payload: { updateProfileStatus } } as const),
}


export const getUser = (id: number): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            const data = await ProfileApi.getUser(id)
            dispatch(actions.usersReceived(data))
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}

export const getStatus = (id: number): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            dispatch(actions.setIsFetching(true))
            const data = await ProfileApi.getStatus(id)
            dispatch(actions.statusReceived(data))
            dispatch(actions.setIsFetching(false))
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}

export const updateStatus = (status: string): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            dispatch(actions.setIsFetching(true))
            const data = await ProfileApi.updateStatus(status)
            if (data.resultCode === ResultCodeEnum.success) {
                dispatch(actions.statusReceived(status))
            }
            dispatch(actions.setIsFetching(false))
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}

export const updateUserPhoto = (file: File): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            dispatch(actions.photosILoaded(true))
            const data = await ProfileApi.updateUserPhoto(file)
            if (data.resultCode === ResultCodeEnum.success) {
                dispatch(actions.photosReceived(data.data.photos))
                dispatch(getAuthUser())
            }
            dispatch(actions.photosILoaded(false))

        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}

export const updateProfile = (profile: ProfileType, setErrors: any): ThunkType<ActionsType> => {
    return async (dispatch, getState) => {
        try {
            dispatch(actions.setUpdateProfileStatus('pending'))
            const data = await ProfileApi.updateProfile(profile)
            if (data.resultCode === ResultCodeEnum.success) {
                dispatch(actions.setUpdateProfileStatus('ready'))
                const authUserId = getState().auth.id
                if (authUserId) {
                    dispatch(getUser(authUserId))
                }
            } else {
                dispatch(actions.setUpdateProfileStatus('error'))
                const errorMessage = data.messages[data.messages.length - 1]
                const fieldName = errorMessage.split('->')[1].split(')').join('').toLocaleLowerCase()
                setErrors({ 'contacts': { [fieldName]: errorMessage } })
            }
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}
