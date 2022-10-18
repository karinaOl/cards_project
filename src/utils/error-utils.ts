import axios, {AxiosError} from "axios";
import {AppActionType, setAppError} from "../sc1-main/m2-bll/appReducer";
import {Dispatch} from "redux";

export const handleAppError = (e: any, dispatch: Dispatch<AppActionType>) => {
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? (err.response.data as { error: string }).error : err.message
        dispatch(setAppError(error))
    } else {
        dispatch(setAppError(`Native error ${err.message}`))
    }
}