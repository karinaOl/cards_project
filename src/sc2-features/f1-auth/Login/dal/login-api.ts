import { instance } from "../../../../sc1-main/m3-dal/instance";
import { UserDataResponseType } from "../../../f2-profile/dal/profile-api";

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<UserDataResponseType>("/auth/login", data);
    },
    registration(data: LoginParamsType) {
        return instance.post<LoginParamsType, RegistrationResponseType>("auth/register", data);
    },
    logout() {
        return instance.delete("/auth/me");
    },
    me() {
        return instance.post<UserDataResponseType>("/auth/me");
    },
    recoverPassword(data: ForgotPasswordDataType) {
        return instance.post("/auth/forgot", data);
    },
    setNewPassword(data: NewPasswordType) {
        return instance.post("/auth/set-new-password", data);
    },
};

export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

export type RegistrationResponseType = {
    addedUser: UserDataResponseType;
    error?: string;
};

export type ForgotPasswordDataType = {
    email: string;
    from: string;
    message: string;
};

export type NewPasswordType = {
    password: string;
    resetPasswordToken: string;
};
