import { CardPacksResponseType, packsApi, PackType } from "../dal/packs-api";
import { AppThunk } from "../../../sc1-main/m2-bll/store";
import { setIsLoadingAC } from "../../../sc1-main/m2-bll/appReducer";
import { handleAppError } from "../../../utils/error-utils";

const initialState = {
    packs: [] as PackType[],
    packName: "",
    min: 0,
    max: 0,
    sortPacks: "",
    page: 1,
    pageCount: 10,
    totalCount: 0,
    user_id: "",
};

export const packsReducer = (
    state: PackInitialStateType = initialState,
    action: PacksActionType
): PackInitialStateType => {
    switch (action.type) {
        case "packs/SET-PACKS-DATA":
            return {
                ...state,
                packs: action.data.cardPacks,
                totalCount: action.data.cardPacksTotalCount,
                page: action.data.page,
                pageCount: action.data.pageCount,
                min: action.data.minCardsCount,
                max: action.data.maxCardsCount,
            };
        default:
            return state;
    }
};

export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
    let { packName, min, max, sortPacks, page, pageCount } = getState().packs;
    let params = { packName, min, max, sortPacks, page, pageCount };
    dispatch(setIsLoadingAC(true));
    try {
        let response = await packsApi.getCardsPacks(params);
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

export const setPacksData = (data: CardPacksResponseType) =>
    ({ type: "packs/SET-PACKS-DATA", data } as const);

export type PackInitialStateType = typeof initialState;
export type SetPacksDataType = ReturnType<typeof setPacksData>;
export type PacksActionType = SetPacksDataType;
