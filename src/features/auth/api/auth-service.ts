import { http } from "../../../shared/api"

const endpoints = {
    signIn: '/sign-in',
    user: '/user',
}

export const AuthService = {
    getUser: () => {
        return http.get(endpoints.user);
    },
    signIn: (login: string) => {
        return http.post(endpoints.signIn, {login});
    },
}