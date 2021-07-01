import { instance } from "./Api"

type CaptchaUrlType = {
    url: string
} 

export const SecurityApi = {
    getCaptchaUrl: async () => {
        const response = await instance.get<CaptchaUrlType>(`security/get-captcha-url`)
        return response.data
    },
}