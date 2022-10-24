import { authAPI, LoginParamsType } from "../../Login/dal/login-api";
import { AppThunk } from "../../../../sc1-main/m2-bll/store";
import { handleAppError } from "../../../../utils/error-utils";
import { setIsLoadingAC } from "../../../../sc1-main/m2-bll/appReducer";

const initialState = {
    isRegistration: false,
};

export const registrationReducer = (
    state: InitialStateType = initialState,
    action: RegistrationActionType
): InitialStateType => {
    switch (action.type) {
        case "registration/REGISTER":
            return { ...state, isRegistration: action.value };
        default:
            return state;
    }
};

const registrationAC = (value: boolean) => ({ type: "registration/REGISTER", value } as const);

export const registrationTC =
    (data: LoginParamsType): AppThunk =>
    async (dispatch) => {
        dispatch(setIsLoadingAC(true));
        try {
            const res = authAPI.registration(data);
            dispatch(registrationAC(true));
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
        }
    };

type InitialStateType = typeof initialState;
export type RegistrationActionType = ReturnType<typeof registrationAC>;
