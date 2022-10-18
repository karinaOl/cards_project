import {authAPI, LoginParamsType} from "../../Login/dal/login-api";
import {AppThunk} from "../../../../sc1-main/m2-bll/store";
import {handleAppError} from "../../../../utils/error-utils";

const initialState = {
    isRegistration: false,
    error: ""
}

export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionType): InitialStateType => {
    switch (action.type) {
        case "registration/REGISTER":
            return {...state, isRegistration: action.value}
        case "registration/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

const registrationAC = (value: boolean) => ({type: "registration/REGISTER", value} as const)
export const setError = (error: string) => ({type: "registration/SET-ERROR", error} as const)

export const registrationTC = (data: LoginParamsType): AppThunk => (dispatch) => {
    authAPI.registration(data)
        .then(res => {
            dispatch(registrationAC(true))
        })
        .catch((e) => {
            handleAppError(e, dispatch)
        })
}

type InitialStateType = typeof initialState;
export type RegistrationActionType = ReturnType<typeof registrationAC> | ReturnType<typeof setError>