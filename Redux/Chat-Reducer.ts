import { MessageSubscriberType, OpenSubscriberType } from './../Api/Chat-api';
import { Dispatch } from 'react';
import { MessageType, WebSocketApi } from '../Api/Chat-api';
import { GetActionsType, ThunkType } from './store';
import { v4 as uuidv4 } from 'uuid';


const initialState = {
   messages: [] as MessageType[],
   wsStatus: 'open' as wsStatusType,
}

export type wsStatusType = 'open' | 'close'
export type InitialStateType = typeof initialState;
type ActionsType = GetActionsType<typeof actions>

export const ChatReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CR/MESSAGES_RECEIVED':  
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages
                    .map((m: MessageType) => ( {...m, id: uuidv4()} ))]
                .filter((m, index, arr) => index >= arr.length - 50)
            }
            case 'CR/CLEAN_MESSAGES':
            case 'CR/WS_STATUS_CHANGED': 
            return {
                ...state,
                ...action.payload
            }    
        default:
            return state
    }
}


export const actions = {
    setMessages: ( messages: MessageType[]) => ({ type: 'CR/MESSAGES_RECEIVED', payload: { messages } } as const),
    wsStatusChanged: (wsStatus: wsStatusType) => ({ type: 'CR/WS_STATUS_CHANGED', payload: { wsStatus } } as const),
    cleanMessages: () =>
    ({ type: 'CR/CLEAN_MESSAGES', payload:{ messages: [] as MessageType[] } } as const),
}


let _messageEventSubscriber: null | MessageSubscriberType = null;
const messageEventSubscriberCreator = (dispatch: Dispatch<ActionsType>) => {
    if(!_messageEventSubscriber){
        _messageEventSubscriber = (messages: MessageType[]) => {
            dispatch(actions.setMessages( messages))
        }
    }
    return _messageEventSubscriber
}

let _openEventSubscriber: null | OpenSubscriberType = null;
const openEventSubscriberCreator = (dispatch: Dispatch<ActionsType>) => {
    if(!_openEventSubscriber){
        _openEventSubscriber = (status: wsStatusType) => {
            dispatch(actions.wsStatusChanged(status))
        }
    }
    return _openEventSubscriber
}

export const startMessageEventListening = ():  ThunkType<ActionsType> => {
    return async (dispatch) => {
            WebSocketApi.start();
            WebSocketApi.subscribe('message', messageEventSubscriberCreator(dispatch));
            WebSocketApi.subscribe('open', openEventSubscriberCreator(dispatch))
    }
}

export const stopMessageEventListening = ():  ThunkType<ActionsType> => {
    return async (dispatch) => {
        WebSocketApi.stop();
        WebSocketApi.unSubscribe('message', messageEventSubscriberCreator(dispatch));
        WebSocketApi.unSubscribe('open', openEventSubscriberCreator(dispatch));
        dispatch(actions.cleanMessages())
    }
}

export const sendMessage = (message: string): ThunkType<ActionsType> => {
    return async () => {
        WebSocketApi.send(message)
    }
}
