import {instance} from "../../../sc1-main/m3-dal/instance";

export const profileApi = {
    updateUser() {
        return instance.put('/auth/me')
    }
}