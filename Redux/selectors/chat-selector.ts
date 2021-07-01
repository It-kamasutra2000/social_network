import { StateType } from '../store';

export const selectIsChatMessages = (state: StateType) => {
    return state.chat.messages
}

export const selectWsStatus = (state: StateType) => {
    return state.chat.wsStatus
}

