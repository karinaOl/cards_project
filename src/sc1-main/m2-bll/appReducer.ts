import { AppThunk } from "./store";
import { authAPI } from "../../sc2-features/f1-auth/Login/dal/login-api";
import { loginAC } from "../../sc2-features/f1-auth/Login/bll/loginReducer";
import { setProfileDataAC } from "../../sc2-features/f2-profile/bll/profileReducer";
import { handleAppError } from "../../utils/error-utils";

const initialState = {
    error: null as null | string,
    isLoading: false,
    isInitialized: false,
};

export const appReducer = (
    state: InitialStateType = initialState,
    action: AppActionType
): InitialStateType => {
    switch (action.type) {
        case "app/SET-ERROR":
            return { ...state, error: action.error };
        case "app/SET-IS-LOADING":
            return { ...state, isLoading: action.value };
        case "app/SET-IS-INITIALIZED":
            return { ...state, isInitialized: action.value };
        default:
            return { ...state };
    }
};

// ActionCreators
export const setAppErrorAC = (error: null | string) => ({ type: "app/SET-ERROR", error } as const);
export const setIsLoadingAC = (value: boolean) => ({ type: "app/SET-IS-LOADING", value } as const);
export const setAppIsInitializedAC = (value: boolean) =>
    ({ type: "app/SET-IS-INITIALIZED", value } as const);

// Thunk

export const initializeAppTC = (): AppThunk => async (dispatch) => {
    try {
        const res = await authAPI.me();
        dispatch(loginAC(true));
        dispatch(setProfileDataAC(res.data));
    } catch (e) {
        handleAppError(e, dispatch);
    } finally {
        dispatch(setAppIsInitializedAC(true));
    }
};

type InitialStateType = typeof initialState;
export type AppActionType =
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsLoadingAC>
    | ReturnType<typeof setAppIsInitializedAC>;
