import {instance} from "../../../../sc1-main/m3-dal/instance";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<RegistrationResponseTypeAddedUser>("/auth/login", data)
    },
    registration(data: LoginParamsType) {
        return instance.post<LoginParamsType, RegistrationResponseType>("auth/register", data)
    },
    logout(){
        return instance.delete('/auth/me')
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}
export type RegistrationResponseType = {
    addedUser: RegistrationResponseTypeAddedUser;
    error?: string
}
export type RegistrationResponseTypeAddedUser = {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
}