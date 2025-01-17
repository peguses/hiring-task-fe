import axios, { AxiosInstance } from 'axios';

export const baseUrl = import.meta.env.REACT_APP_BACK_END;


const httpApiKit: AxiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  timeout: 20000
});

export default httpApiKit;
