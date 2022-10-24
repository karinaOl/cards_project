import { authAPI, LoginParamsType } from "../../Login/dal/login-api";
import { AppThunk } from "../../../../sc1-main/m2-bll/store";
import { handleAppError } from "../../../../utils/error-utils";
import { setIsLoadingAC } from "../../../../sc1-main/m2-bll/appReducer";

const initialState = {
    isRegistration: false,
    error: "",
};

export const registrationReducer = (
    state: InitialStateType = initialState,
    action: RegistrationActionType
): InitialStateType => {
    switch (action.type) {
        case "registration/REGISTER":
            return { ...state, isRegistration: action.value };
        case "registration/SET-ERROR":
            return { ...state, error: action.error };
        default:
            return state;
    }
};

const registrationAC = (value: boolean) => ({ type: "registration/REGISTER", value } as const);
export const setErrorAC = (error: string) => ({ type: "registration/SET-ERROR", error } as const);

export const registrationTC =
    (data: LoginParamsType): AppThunk =>
    (dispatch) => {
        dispatch(setIsLoadingAC(true));
        authAPI
            .registration(data)
            .then((res) => {
                dispatch(registrationAC(true));
            })
            .catch((e) => {
                handleAppError(e, dispatch);
            })
            .finally(() => {
                dispatch(setIsLoadingAC(false));
            });
    };

type InitialStateType = typeof initialState;
export type RegistrationActionType =
    | ReturnType<typeof registrationAC>
    | ReturnType<typeof setErrorAC>;
