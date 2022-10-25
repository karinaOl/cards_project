import { CardPacksResponseType, packsApi, PackType } from "../dal/packs-api";
import { AppThunk } from "../../../sc1-main/m2-bll/store";
import { setIsLoadingAC } from "../../../sc1-main/m2-bll/appReducer";
import { handleAppError } from "../../../utils/error-utils";

const initialState = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    token: "",
    tokenDeathTime: 0,
};

export const packsReducer = (
    state: PackInitialStateType = initialState,
    action: PacksActionType
): PackInitialStateType => {
    switch (action.type) {
        case "packs/SET-PACKS-DATA":
            return { ...state, ...action.data };
        default:
            return state;
    }
};
export const setPacksData = (data: CardPacksResponseType) =>
    ({ type: "packs/SET-PACKS-DATA", data } as const);

export const getPacksTC = (): AppThunk => async (dispatch) => {
    dispatch(setIsLoadingAC(true));
    try {
        let response = await packsApi.getCardsPacks({ pageCount: 8 });
        dispatch(setPacksData(response.data));
    } catch (e) {
        handleAppError(e, dispatch);
    } finally {
        dispatch(setIsLoadingAC(false));
    }
};

export const addPackTC =
    (name: string): AppThunk =>
    async (dispatch) => {
        dispatch(setIsLoadingAC(true));
        try {
            await packsApi.createCardsPack({ cardsPack: { name } });
            dispatch(getPacksTC());
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
        }
    };

export const deletePackTC =
    (id: string): AppThunk =>
    async (dispatch) => {
        dispatch(setIsLoadingAC(true));
        try {
            await packsApi.deleteCardsPack(id);
            dispatch(getPacksTC());
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
        }
    };

export type PackInitialStateType = typeof initialState;
export type SetPacksDataType = ReturnType<typeof setPacksData>;
export type PacksActionType = SetPacksDataType;
