
import { AxiosResponse } from "axios"
import { Feedback, Page } from "../context/FeedbackContextProvider"
import apiKit from "../helpers/axios-http-kit";

export const submitFeedback = async (data: Feedback) :Promise<AxiosResponse<any>> => {
    return apiKit.post(`/feedbacks`, {...data})
}

export const fetchFeedbacks = async (page?: Page) :Promise<AxiosResponse<any>> => {
    return apiKit.get(`/feedbacks?page=${page?.page}&limit=${page?.pageSize}`)
}

export const fetchFeedbackStatistics = async () :Promise<AxiosResponse<any>> => {
    return apiKit.get(`/feedbacks/statistics`)
}