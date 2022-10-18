import {instance} from "../../../sc1-main/m3-dal/instance";

export const profileApi = {
    updateUser(data: UpdateUserParamsType) {
        return instance.put<UpdateUserParamsType, UpdateUserResponseType>('/auth/me', data)
    }
}

type UpdateUserParamsType = {
    name: string,
    avatar: string
}

type UpdateUserResponseType = {
    updatedUser: {}
    error?: string
}

export type UserDataResponseType = {
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