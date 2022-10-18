import {AppThunk} from "../../../sc1-main/m2-bll/store";
import {UserDataResponseType} from "../dal/profile-api";
import {authAPI} from "../../f1-auth/Login/dal/login-api";
import {loginAC} from "../../f1-auth/Login/bll/loginReducer";

const initialState = {
    name: '',
    email: ''
}

export const profileReducer = (state: ProfileInitialStateType = initialState, action: ProfileActionType): ProfileInitialStateType => {
    switch (action.type) {
        case "profile/CHANGE-NAME":
            return {
                ...state,
                name: action.newName
            }
        case "profile/SET-PROFILE-DATA":
            return {
                ...state,
                email: action.email,
                name: action.name
            }
        default:
            return state
    }
}

export const changeNameAC = (newName: string) => ({type: 'profile/CHANGE-NAME', newName} as const)
export const setProfileDataAC = (profileData: UserDataResponseType) =>
    ({type: 'profile/SET-PROFILE-DATA', name: profileData.name, email: profileData.email} as const)


export const logoutTC = (): AppThunk => (dispatch) => {
    authAPI.logout()
        .then((res) => {
            dispatch(loginAC(false))
        })
}

export type ProfileInitialStateType = typeof initialState;
export type ProfileActionType =
    | ReturnType<typeof changeNameAC>
    | ReturnType<typeof setProfileDataAC>
