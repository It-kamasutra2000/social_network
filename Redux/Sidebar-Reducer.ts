import { UserApi } from './../Api/User-api';
import { Dispatch } from 'react';
import { GetActionsType, ThunkType } from './store';
import { UserType } from '../types/types';
import { message } from 'antd';
import { unFollow } from './User-Reducer';


const initialState = {
    friends: [] as UserType[],
}

export type InitialStateType = typeof initialState;
type ActionsType = GetActionsType<typeof actions>

export const SideBarReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SB/FRIENDS_RECEIVED':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}


export const actions = {
    friendsReceived: (friends: UserType[]) =>
        ({ type: 'SB/FRIENDS_RECEIVED', payload: { friends } } as const),
}



export const getFriends = (): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            const result = await UserApi.getUsers(20, 3, { term: '', friend: true })
            dispatch(actions.friendsReceived(result.items))
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}

export const deleteFriend = (id: number): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            let result = dispatch(unFollow(id))
            Promise.all([result]).then(() => {
                dispatch(getFriends())
            })
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}
