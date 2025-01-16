
import { AxiosResponse } from "axios"
import { Feedback } from "../context/FeedbackContextProvider"
import apiKit from "../helpers/axios-http-kit";

export const submitFeedback = async(data: Feedback):Promise<AxiosResponse<any>> => {
    return apiKit.post(`/feedbacks`, {...data})
}