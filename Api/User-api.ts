import { FilterType } from './../Redux/User-Reducer';
import { UserType } from '../types/types';
import { instance, ResponseType } from "./Api"

type UserResponseType = {
    items: UserType[]
    totalCount: number
    error: string
}

export const UserApi = {
    getUsers: async (pageNumber: number, pageSize: number,  filter: FilterType) => {
        const response = await instance.get<UserResponseType>(`users?count=${pageSize}
        &page=${pageNumber}&term=${filter.term}&friend=${filter.friend}`)
        return response.data
    },
    follow: async (id: number) => {
        const response = await instance.post<ResponseType>(`follow/${id}`)
        return response.data
    }, 
    unFollow: async (id: number) => {
        const response = await instance.delete<ResponseType>(`follow/${id}`)
        return response.data
    }, 
}
