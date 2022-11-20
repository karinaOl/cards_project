import { AppThunk } from "../../../../sc1-main/m2-bll/store";
import { authAPI, ForgotPasswordDataType, NewPasswordType } from "../../Login/dal/login-api";

const initialState = {};

export const newPasswordReducer = (
    state: NewPasswordInitialStateType = initialState,
    action: NewPasswordActionType
): NewPasswordInitialStateType => {
    switch (action.type) {
        case "NEW_PASSWORD":
            return { ...state };
        default:
            return state;
    }
};

const actionC = () => ({ type: "NEW_PASSWORD" } as const);

export const recoverPasswordTC =
    (data: ForgotPasswordDataType): AppThunk =>
    async (dispatch) => {
        await authAPI.recoverPassword(data);
    };

export const setNewPasswordTC =
    (data: NewPasswordType): AppThunk =>
    async (dispatch) => {
        await authAPI.setNewPassword(data);
    };

export type NewPasswordInitialStateType = typeof initialState;
export type NewPasswordActionType = ReturnType<typeof actionC>;
