import { StateType } from './../store';


export const selectUsers = (state: StateType) => {
    return state.users.users
}

export const selectIsFetching = (state: StateType) => {
    return state.users.isFetching
}

export const selectTotalUserCount = (state: StateType) => {
    return state.users.totalUsersCount
}

export const selectPageNumber = (state: StateType) => {
    return state.users.pageNumber
}
export const selectPageSize = (state: StateType) => {
    return state.users.pageSize
}

export const selectFilter = (state: StateType) => {
    return state.users.filter
}

export const selectFollowingInProgress = (state: StateType) => {
    return state.users.followInProgress
}
