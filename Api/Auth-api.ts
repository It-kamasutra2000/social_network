import { instance, ResponseType, ResultCodeCaptchaEnum, ResultCodeEnum } from "./Api"

export type AuthMeDataType = {
        id: number
        email: string
        login: string
}

export const AuthApi = {
    authMe: async () => {
        const response = await instance.get<ResponseType<AuthMeDataType>>(`auth/me`)
        return response.data
    },
    login: async (email: string, password: string, rememberMe: boolean, captcha = '') => {
        const response = await instance.post<ResponseType<{}, ResultCodeEnum | ResultCodeCaptchaEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        })
        return response.data
    },
    logout: async () => {
        const response = await instance.delete<ResponseType>(`auth/login`)
        return response.data
    },
}