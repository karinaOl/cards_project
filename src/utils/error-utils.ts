import axios, { AxiosError } from "axios";
import { AppActionType, setAppErrorAC } from "../sc1-main/m2-bll/appReducer";
import { Dispatch } from "redux";

export const handleAppError = (e: any, dispatch: Dispatch<AppActionType>) => {
    const err = e as Error | AxiosError;
    if (axios.isAxiosError(err)) {
        const error = err.response?.data
            ? (err.response.data as { error: string }).error
            : err.message;
        dispatch(setAppErrorAC(error));
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`));
    }
};
