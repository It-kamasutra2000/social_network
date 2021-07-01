import { PhotosType } from '../types/types';
import { ProfileType } from "../types/types"
import { instance, ResponseType } from "./Api"

type PhotosResponseType = {
    photos: PhotosType
}

export const ProfileApi = {
    getUser: async (id: number) => {
        const response = await instance.get<ProfileType>(`profile/${id}`)
        return response.data
    },
    getStatus: async (id: number) => {
        const response = await instance.get<string>(`profile/status/${id}`)
        return response.data
    },
    updateStatus: async (status: string) => {
        const response = await instance.put<ResponseType>(`profile/status`, { status })
        return response.data
    },
    updateUserPhoto: async (file: File) => {
        const data = new FormData()
        data.append('file', file)
        const response = await instance.put<ResponseType<PhotosResponseType>>(`profile/photo`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    },
    updateProfile: async (profile: ProfileType) => {
            const response = await instance.put<ResponseType>(`profile`, profile)
            return response.data
        }
}
