import { AppActionType, setResponseMessageAC } from "../sc1-main/m2-bll/appReducer";
import { Dispatch } from "redux";

export const successResponseUtils = (message: string, dispatch: Dispatch<AppActionType>) => {
    dispatch(setResponseMessageAC(message));
};
