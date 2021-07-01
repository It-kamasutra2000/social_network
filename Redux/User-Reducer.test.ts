import { actions, InitialStateType, UserReducer } from './User-Reducer';


let state: InitialStateType;

beforeEach(() => {
    state = {
        users: [
            {
                name: "ymeu17",
                id: 2,
                uniqueUrlName: null,
                status: null, 
                followed: false,
                photos: {
                    large: null,
                    small: null
                }
            }
        ],
        isFetching: false,
        filter: {term: "", friend: true},
        totalUsersCount: 0,
        pageNumber: 1,
        pageSize: 10,
        followInProgress: []
    }
})


test('followed success', () => {
    //action
    const newState = UserReducer(state, actions.followIsFinished(2))

    //expectation
    expect(newState.users[0].followed).toBe(true)
})



describe('tests for pagination', ()=>{
    test('pageNumber must be correct',()=> {

        const newState = UserReducer(state, actions.setPageNumber(2))
    
        expect(newState.pageNumber).toBe(2)
        expect(newState.pageSize).toBe(10)
    })
    
})
