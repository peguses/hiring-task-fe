
import { AxiosResponse } from "axios"
import apiKit from "../helpers/axios-http-kit";
import { User } from "../context/UserContextProvider";

export const requestLogin = async(data: User):Promise<AxiosResponse<any>> => {
    return apiKit.post(`/auth/signin`, {...data})
}