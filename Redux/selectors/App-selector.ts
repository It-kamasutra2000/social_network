import { StateType } from '../store';

export const selectIsAuthorizeFinished = (state: StateType) => {
    return state.app.isAuthorizeFinished
}

