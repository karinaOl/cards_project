import { AppThunk } from "../../../../sc1-main/m2-bll/store";
import { authAPI, NewPasswordType } from "../../Login/dal/login-api";
import { handleAppError } from "../../../../utils/error-utils";
import { setIsLoadingAC } from "../../../../sc1-main/m2-bll/appReducer";
import { successResponseUtils } from "../../../../utils/successResponse-utils";

const initialState = {
    isNewPasswordIsSet: false,
};

export const newPasswordReducer = (
    state: NewPasswordInitialStateType = initialState,
    action: NewPasswordActionType
): NewPasswordInitialStateType => {
    switch (action.type) {
        case "new_password/SET-NEW-PASSWORD":
            return {
                ...state,
                isNewPasswordIsSet: true,
            };
        default:
            return state;
    }
};

export const setNewPasswordAC = () => ({ type: "new_password/SET-NEW-PASSWORD" } as const);

export const setNewPasswordTC =
    (data: NewPasswordType): AppThunk =>
    async (dispatch) => {
        dispatch(setIsLoadingAC(true));
        try {
            await authAPI.setNewPassword(data);
            dispatch(setNewPasswordAC());
            const successMessage = "The Password was changed";
            successResponseUtils(successMessage, dispatch);
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
        }
    };

export type NewPasswordInitialStateType = typeof initialState;
export type NewPasswordActionType = ReturnType<typeof setNewPasswordAC>;
