import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
      "API-KEY": "bb181220-b3ed-4219-9d9b-5805e04d81d5"
    }
  });

  export type ResponseType<D = {}, RC = ResultCodeEnum> = {
    resultCode: RC
    messages: string[]
    data: D
  }

  export enum ResultCodeEnum {
    success = 0,
    error = 1
  }

  export enum ResultCodeCaptchaEnum {
    captcha = 10
  }
