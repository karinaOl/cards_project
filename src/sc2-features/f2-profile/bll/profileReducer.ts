import { profileApi, UpdateUserParamsType, UserDataResponseType } from "../dal/profile-api";
import { authAPI } from "../../f1-auth/Login/dal/login-api";
import { AppThunk } from "../../../sc1-main/m2-bll/store";
import { loginAC } from "../../f1-auth/Login/bll/loginReducer";
import { handleAppError } from "../../../utils/error-utils";
import { setIsLoadingAC } from "../../../sc1-main/m2-bll/appReducer";

const initialState = {
    _id: null as string | null,
    email: null as string | null,
    avatar: null as string | null,
    rememberMe: false,
    isAdmin: false,
    name: "Default Name",
    verified: true,
    publicCardPacksCount: 0,
    created: null as string | null,
    updated: null as string | null,
    token: "",
};

export const profileReducer = (
    state: ProfileInitialStateType = initialState,
    action: ProfileActionType
): ProfileInitialStateType => {
    switch (action.type) {
        case "profile/UPDATE-USER":
            return {
                ...state,
                name: action.model.name,
                avatar: action.model.avatar,
            };
        case "profile/SET-PROFILE-DATA":
            return {
                ...state,
                ...action.profileData,
            };
        default:
            return state;
    }
};

// Action Creators

export const updateUserAC = (model: UserDataResponseType) =>
    ({ type: "profile/UPDATE-USER", model } as const);
export const setProfileDataAC = (profileData: UserDataResponseType) =>
    ({
        type: "profile/SET-PROFILE-DATA",
        profileData,
    } as const);

// Thunks

export const updateUserNameTC =
    (name: string, avatar: string): AppThunk =>
    async (dispatch) => {
        const payload: UpdateUserParamsType = { name, avatar };

        dispatch(setIsLoadingAC(true));

        try {
            await profileApi.updateUser(payload);
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
        }
    };

export const logoutTC = (): AppThunk => async (dispatch) => {
    dispatch(setIsLoadingAC(true));
    try {
        await authAPI.logout();
        dispatch(loginAC(false));
    } catch (e) {
        handleAppError(e, dispatch);
    } finally {
        dispatch(setIsLoadingAC(false));
    }
};

export type ProfileInitialStateType = typeof initialState;
export type ProfileActionType =
    | ReturnType<typeof updateUserAC>
    | ReturnType<typeof setProfileDataAC>;
