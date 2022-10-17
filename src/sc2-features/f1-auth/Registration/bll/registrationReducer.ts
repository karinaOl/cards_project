import {authAPI, LoginParamsType} from "../../Login/dal/login-api";
import {AppThunk} from "../../../../sc1-main/m2-bll/store";

const initialState = {
    isRegistration: false,
    error: ""
}

export const registrationReducer = (state: RegistrationInitialStateType = initialState, action: RegistrationActionType): RegistrationInitialStateType => {
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
            console.log(res)
            dispatch(registrationAC(true))
        })
        .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console')
                console.log(error)
            }
        )
}

export type RegistrationInitialStateType = typeof initialState;
export type RegistrationActionType = ReturnType<typeof registrationAC> | ReturnType<typeof setError>