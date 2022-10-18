import {profileApi, UpdateUserParamsType, UserDataResponseType} from "../dal/profile-api";
import {authAPI} from "../../f1-auth/Login/dal/login-api";
import {AppThunk} from "../../../sc1-main/m2-bll/store";
import {loginAC} from "../../f1-auth/Login/bll/loginReducer";


const initialState = {
    _id: '',
    email: '',
    avatar: null as string | null,
    rememberMe: false,
    isAdmin: false,
    name: '',
    verified: true,
    publicCardPacksCount: 0,
    created: '',
    updated: '',
}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionType): ProfileInitialStateType => {
    switch (action.type) {
        case "profile/UPDATE-USER":
            return {
                ...state,
                name: action.model.name,
                avatar: action.model.avatar
            }
        case "profile/SET-PROFILE-DATA":
            return {
                ...state,
                name: action.name,
                email: action.email
            }
        default:
            return state
    }
}

export const updateUserAC = (model: UserDataResponseType) => ({type: 'profile/UPDATE-USER', model} as const)
export const setProfileDataAC = (profileData: UserDataResponseType) =>
    ({type: 'profile/SET-PROFILE-DATA', name: profileData.name, email: profileData.email} as const)

export const updateUserNameTC = (name: string): AppThunk => (dispatch, getState) => {
    const avatar = getState().profile.avatar
    const payload: UpdateUserParamsType = {name, avatar}
    profileApi.updateUser(payload)
        .then((res) => {
            console.log(res)
        })
}

// создать санку с аватаркой

export const logoutTC = (): AppThunk => (dispatch) => {
    authAPI.logout()
        .then((res) => {
            dispatch(loginAC(false))
        })
}

export type ProfileInitialStateType = typeof initialState;
export type ProfileActionType =
    | ReturnType<typeof updateUserAC>
    | ReturnType<typeof setProfileDataAC>
