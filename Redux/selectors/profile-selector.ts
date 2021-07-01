import { StateType } from './../store';

export const selectProfile = (state: StateType) => {
    return state.profile.profile
}

export const selectStatus = (state: StateType) => {
    return state.profile.status
}

export const selectIsFetching = (state: StateType) => {
    return state.profile.isFetching
}

export const selectIsLoading = (state: StateType) => {
    return state.profile.isLoading
}

export const selectUpdateProfileStatus = (state: StateType) => {
    return state.profile.updateProfileStatus
}

export const selectIcons = (state: StateType) => {
    return state.profile.icons
}
