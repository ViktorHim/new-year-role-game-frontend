import axios from 'axios';
import { API_URL, LocalStorageKeys } from '../config';

import { toast } from 'sonner';

export const http = axios.create({ baseURL: API_URL });

export const showError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        toast.error(error.message);
    } else {
        toast.error('Неизвестная ошибка');
    }
};

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

http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    localStorage.removeItem(LocalStorageKeys.TOKEN);
                    break;

                case 400:
                    showError(error);
                    break;
                case 500:
                case 502:
                case 503:
                    toast.error('Ошибка сервера. Попробуйте позже');
                    break;

                default:
                    break;
            }
        } else if (error.request) {
            toast.error('Проблемы с подключением к интернету');
        }

        return Promise.reject(error);
    },
);
