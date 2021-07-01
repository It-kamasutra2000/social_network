import { GetActionsType, ThunkType } from './store';
import { authMe } from './auth-Reducer';
import { message } from 'antd';


const initialState = {
    isAuthorizeFinished: false,
}

export type InitialStateType = typeof initialState;
type ActionsType = GetActionsType<typeof actions>

export const AppReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AP/AUTHORIZE_IS_FINISHED':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}


export const actions = {
        authorizedIsFinished: (isAuthorizeFinished: boolean) =>
        ({ type: 'AP/AUTHORIZE_IS_FINISHED', payload: { isAuthorizeFinished } } as const),
}



export const authorize = (): ThunkType<ActionsType> => {
    return async (dispatch) => {
        try {
            const result = dispatch(authMe())
            Promise.all([result]).then(()=> {
                dispatch(actions.authorizedIsFinished(true))
            })
        } catch (e) {
            const errorMessage = JSON.stringify(e.message)
            const errorText = errorMessage.slice(1, errorMessage.length - 1)
            message.error(errorText)
        }
    }
}
