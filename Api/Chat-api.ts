import { wsStatusType } from './../Redux/Chat-Reducer';

let ws: null | WebSocket = null

let subscribers = {
    message: [] as MessageSubscriberType[],
    open: [] as OpenSubscriberType[]
}


const onMessageHandler = (e: MessageEvent) => {
    subscribers.message.forEach((s) => s(JSON.parse(e.data)))
}

const onErrorHandler = () => {
    console.log('error')
}

const onCloseHandler = () => {
    setTimeout(() => {
        createWebsocket()
        console.log('reconnecting')
        subscribers.open.forEach((s) => s('close'))
    }, 3000)
}
const onOpenHandler = () => {
    subscribers.open.forEach((s) => s('open'))
}


const clineUp = () => {
    ws?.close();
    ws?.removeEventListener('message', onMessageHandler);
    ws?.removeEventListener('close', onCloseHandler);
    ws?.removeEventListener('open', onOpenHandler);
    ws?.removeEventListener('error', onErrorHandler);
}

const createWebsocket = () => {
    clineUp()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    ws.addEventListener('message', onMessageHandler);
    ws.addEventListener('close', onCloseHandler);
    ws.addEventListener('open', onOpenHandler);
    ws.addEventListener('error', onErrorHandler);
}

export const WebSocketApi = {
    start() {
        createWebsocket()
    },
    subscribe(wsEvent: WsEventType, callback: SubscriberType) {
        subscribers = { ...subscribers, [wsEvent]: [...subscribers[wsEvent], callback] }
    },
    unSubscribe(wsEvent: WsEventType, callback: SubscriberType) {
        //@ts-ignore
        subscribers = { ...subscribers, [wsEvent]: subscribers[wsEvent].filter((s: SubscriberType) => s !== callback) }
    },
    send(message: string) {
        ws?.send(message);
    },
    stop() {
        clineUp()
        subscribers = { ...subscribers, message: [] }
        subscribers = { ...subscribers, open: [] }
    }
}


export type WsEventType = 'message' | 'open'
type SubscriberType = MessageSubscriberType | OpenSubscriberType
export type MessageSubscriberType = (messages: MessageType[]) => void
export type OpenSubscriberType = (wsStatus: wsStatusType) => void
export type MessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
    id: string 
}