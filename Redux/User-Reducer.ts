import { UserApi } from './../Api/User-api';
import { UserType } from '../types/types';
import { GetActionsType, ThunkType } from './store';
import { ResultCodeEnum } from '../Api/Api';
import { message } from 'antd';


const initialState = {
    users: [] as UserType[],
    isFetching: false,
    followInProgress: [] as number[],
    totalUsersCount: 0,
    pageNumber: 1,
    pageSize: 10,
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

export type FilterType = typeof initialState.filter
export type InitialStateType = typeof initialState;
type ActionsType = GetActionsType<typeof actions>


export const UserReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'UR/USERS_RECEIVED':
            return {
                ...state,
                users: action.payload.users
            }
        case 'UR/FOLLOW_IS_FINISHED':
            return {
                ...state,
                users: [...state.users?.map((u: UserType) => {
                    if (u.id === action.payload.userId) {
                        return { ...u, followed: true }
                    } else {
                        return u
                    }
                })]
            }
        case 'UR/UNFOLLOW_IS_FINISHED':
            return {
                ...state,
                users: [...state.users?.map((u: UserType) => {
                    if (u.id === action.payload.userId) {
                        return { ...u, followed: false }
                    } else {
                        return u
                    }
                })]
            }
        case 'UR/SET_PAGE_NUMBER':
            return {
                ...state,
                pageNumber: action.payload.pageNumber
            }
        case 'UR/SET_FILTER_DATA':
            return {
                ...state,
                filter: action.payload.filter
            }
        case 'UR/SET_FOLLOWING_PROGRESS':
            return {
                ...state,
                followInProgress: action.payload.isFollowInProgress ? [...state.followInProgress, action.payload.id]
                    : state.followInProgress.filter((id) => id !== action.payload.id)
            }
        case 'UR/SET_IS_FETCHING':
        case 'UR/TOTAL_COUNT_IS_RECEIVED':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}


export const actions = {
    usersReceived: (users: UserType[]) =>
        ({ type: 'UR/USERS_RECEIVED', payload: { users } } as const),
    setIsFetching: (isFetching: boolean) =>
        ({ type: 'UR/SET_IS_FETCHING', payload: { isFetching } } as const),
    followIsFinished: (userId: number) =>
        ({ type: 'UR/FOLLOW_IS_FINISHED', payload: { userId } } as const),
    unFollowIsFinished: (userId: number) =>
        ({ type: 'UR/UNFOLLOW_IS_FINISHED', payload: { userId } } as const),
    totalCountIsReceived: (totalUsersCount: number) =>
        ({ type: 'UR/TOTAL_COUNT_IS_RECEIVED', payload: { totalUsersCount } } as const),
    setPageNumber: (pageNumber: number) =>
        ({ type: 'UR/SET_PAGE_NUMBER', payload: { pageNumber } } as const),
    setFilterData: (filter: FilterType) =>
        ({ type: 'UR/SET_FILTER_DATA', payload: { filter } } as const),
    setFollowInProgress: (id: number, isFollowInProgress: boolean) =>
        ({ type: 'UR/SET_FOLLOWING_PROGRESS', payload: { id, isFollowInProgress } } as const),
}


export const getUsers = (pageNumber: number, pageSize: number, filter: FilterType): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            dispatch(actions.setFilterData(filter))
            dispatch(actions.setIsFetching(true))
            dispatch(actions.setPageNumber(pageNumber))
            const data = await UserApi.getUsers(pageNumber, pageSize, filter)
            dispatch(actions.setIsFetching(false))
            dispatch(actions.usersReceived(data.items))
            dispatch(actions.totalCountIsReceived(data.totalCount))
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)       
        }
    }
}

export const follow = (userId: number): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            const data = await UserApi.follow(userId)
            if (data.resultCode === ResultCodeEnum.success) {
                dispatch(actions.followIsFinished(userId))
                dispatch(actions.setFollowInProgress(userId, false))
            }
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}

export const unFollow = (userId: number): ThunkType<ActionsType, Promise<any>> => {
    return async (dispatch) => {
        try {
            const data = await UserApi.unFollow(userId)
            if (data.resultCode === ResultCodeEnum.success) {
                dispatch(actions.unFollowIsFinished(userId))
                dispatch(actions.setFollowInProgress(userId, false))
            }
            return data
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}

