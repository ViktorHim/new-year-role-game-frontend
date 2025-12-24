import axios from 'axios';
import { API_URL, LocalStorageKeys } from '../config';

export const http = axios.create({ baseURL: API_URL });

http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(LocalStorageKeys.TOKEN);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);
