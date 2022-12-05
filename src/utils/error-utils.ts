import axios, { AxiosError } from "axios";
import { AppActionType, setAppErrorAC } from "../sc1-main/m2-bll/appReducer";
import { Dispatch } from "redux";

export const handleAppError = (e: any, dispatch: Dispatch<AppActionType>) => {
    console.log(e);
    const err = e as Error | AxiosError;
    if (axios.isAxiosError(err)) {
        let error = err.response?.data
            ? (err.response.data as { error: string }).error
            : err.message;
        if (err.response?.status === 413) {
            error = "Image is too large";
        }
        dispatch(setAppErrorAC(error));
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`));
    }
};
