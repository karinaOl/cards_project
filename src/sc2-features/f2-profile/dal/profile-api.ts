import { instance } from "../../../sc1-main/m3-dal/instance";

export const profileApi = {
    updateUser(data: UpdateUserParamsType) {
        return instance.put<UpdateUserParamsType, UpdateUserResponseType>("/auth/me", data);
    },
};

export type UpdateUserParamsType = {
    name: string;
    avatar: string | null;
};

type UpdateUserResponseType = {
    updatedUser: {};
    error?: string;
};

export type UserDataResponseType = {
    _id: string;
    email: string;
    avatar: string | null;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
};
