import { actions, InitialStateType, ProfileReducer } from "./Profile-Reducer"

let state: InitialStateType;

beforeEach(() => {
    state = {
        profile: null,
        status: null,
        isFetching: false,
        isLoading: false,
        updateProfileStatus: null,
        icons: {}
    }
})

test('status must be correct', () => {
    //action
    const newState = ProfileReducer(state, actions.statusReceived('test status'))

    //expectation
    expect(newState.status).toBe('test status')
})

test('isFetching must work correct', () => {
    //action
    const newState = ProfileReducer(state, actions.setIsFetching(true))

    //expectation
    expect(newState.isFetching).toBe(true)
})
