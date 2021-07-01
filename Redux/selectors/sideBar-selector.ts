import { StateType } from '../store';

export const selectFriends = (state: StateType) => {
    return state.sideBar.friends
}

