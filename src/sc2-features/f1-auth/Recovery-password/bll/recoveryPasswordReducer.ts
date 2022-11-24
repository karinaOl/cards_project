import { authAPI, ForgotPasswordDataType } from "../../Login/dal/login-api";
import { AppThunk } from "../../../../sc1-main/m2-bll/store";
import { setIsLoadingAC } from "../../../../sc1-main/m2-bll/appReducer";
import { handleAppError } from "../../../../utils/error-utils";

const initialState = {
    success: false,
    email: "",
};

export const recoveryPasswordReducer = (
    state: RecoveryPasswordInitialStateType = initialState,
    action: RecoveryPasswordActionType
): RecoveryPasswordInitialStateType => {
    switch (action.type) {
        case "recovery_password/IS-RECOVERY-PASSWORD-SUCCESS":
            return {
                ...state,
                ...action.data,
            };
        case "recovery_password/SET-RECOVERY-EMAIL":
            return {
                ...state,
                email: action.email,
            };
        default:
            return state;
    }
};

export const setRecoveryEmailAC = (email: string) =>
    ({ type: "recovery_password/SET-RECOVERY-EMAIL", email } as const);

export const isRecoveryPasswordSuccessAC = (data: recoveryPasswordDataType) =>
    ({ type: "recovery_password/IS-RECOVERY-PASSWORD-SUCCESS", data } as const);

export const recoveryPasswordTC =
    (data: ForgotPasswordDataType): AppThunk =>
    async (dispatch) => {
        dispatch(setIsLoadingAC(true));
        try {
            const response = await authAPI.recoverPassword(data);
            dispatch(isRecoveryPasswordSuccessAC(response.data));
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
        }
    };

export type RecoveryPasswordInitialStateType = typeof initialState;
export type RecoveryPasswordActionType =
    | ReturnType<typeof isRecoveryPasswordSuccessAC>
    | ReturnType<typeof setRecoveryEmailAC>;

export type recoveryPasswordDataType = {
    answer: boolean;
    html: boolean;
    info: string;
    success: boolean;
};
