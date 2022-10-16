import {instance} from "../../../../sc1-main/m3-dal/instance";


export const authAPI  = {
    login(data: LoginParamsType){
        return instance.post("/auth/login", data)
    }
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}