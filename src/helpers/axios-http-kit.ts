import axios, { AxiosInstance } from 'axios';

export const baseUrl = import.meta.env.REACT_APP_BACK_END;

const userName = "test";
const password = "test";
const credentials = `${userName}:${password}`;

const encodedCredentials = btoa(credentials);

const httpApiKit: AxiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  headers: {
    'Authorization': `Basic ${encodedCredentials}`,
  },
  timeout: 20000
});

export default httpApiKit;
