import { ThunkAction } from 'redux-thunk'
import { SideBarReducer } from './Sidebar-Reducer';
import { UserReducer } from './User-Reducer';
import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import { ProfileReducer } from "./Profile-Reducer";
import thunk from 'redux-thunk';
import { AuthReducer } from "./auth-Reducer";
import { AppReducer } from './App-Reducer';
import { ChatReducer } from './Chat-Reducer';

const rootReducer = combineReducers({
    profile: ProfileReducer,
    auth: AuthReducer,
    users: UserReducer,
    app: AppReducer,
    chat: ChatReducer,
    sideBar: SideBarReducer
})


type TypeWithInfer<T> = T extends {[key: string]: infer U} ? U : any
export type GetActionsType<T extends {[key: string]: (...args: any) => any}> = ReturnType<TypeWithInfer<T>>   
export type StateType = ReturnType<typeof rootReducer>
export type ThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


//@ts-ignore
window._store = store
export default store