import {
    CardPacksResponseType,
    GetCardsPackRequestParamsType,
    packsApi,
    PackType,
    UpDateCardsPackRequestDataType,
} from "../dal/packs-api";
import { AppThunk } from "../../../sc1-main/m2-bll/store";
import { setIsLoadingAC } from "../../../sc1-main/m2-bll/appReducer";
import { handleAppError } from "../../../utils/error-utils";

const initialState = {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 3,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    searchFilter: "",
    sortPacks: "0updated",
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
        case "packs/CHANGE-CURRENT-PAGE":
            return {
                ...state,
                page: action.page,
            };
        case "packs/CHANGE-COUNT-OF-PACKS-ON-PAGE":
            return {
                ...state,
                pageCount: action.count,
            };
        case "SORT-CARDS-COUNT":
            return {
                ...state,
                cardPacks: action.sortedCardPacks,
            };
        default:
            return state;
    }
};

// Action Creators

export const setPacksDataAC = (data: CardPacksResponseType) =>
    ({ type: "packs/SET-PACKS-DATA", data } as const);

export const changeCurrentPageAC = (page: number) =>
    ({
        type: "packs/CHANGE-CURRENT-PAGE",
        page,
    } as const);

export const changeCountOfPacksOnPageAC = (count: number) =>
    ({
        type: "packs/CHANGE-COUNT-OF-PACKS-ON-PAGE",
        count,
    } as const);

export const sortCardsCountAC = (sortedCardPacks: PackType[]) =>
    ({
        type: "SORT-CARDS-COUNT",
        sortedCardPacks,
    } as const);

// Thunk Creators

export const getPacksTC = (): AppThunk => async (dispatch, getState) => {
    const { page, pageCount, minCardsCount, maxCardsCount, sortPacks, searchFilter } =
        getState().packs;
    const queryParams: GetCardsPackRequestParamsType = {
        page,
        pageCount,
        sortPacks,
        packName: searchFilter,
        min: minCardsCount,
        max: maxCardsCount,
    };
    dispatch(setIsLoadingAC(true));
    try {
        let response = await packsApi.getCardsPacks(queryParams);
        dispatch(setPacksDataAC(response.data));
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

export const updatePackTC =
    (data: UpDateCardsPackRequestDataType): AppThunk =>
    async (dispatch) => {
        dispatch(setIsLoadingAC(true));
        try {
            await packsApi.updateCardsPack(data);
            dispatch(getPacksTC());
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
        }
    };

export type PackInitialStateType = typeof initialState;
export type SetPacksDataType = ReturnType<typeof setPacksDataAC>;
export type PacksActionType =
    | SetPacksDataType
    | ReturnType<typeof changeCurrentPageAC>
    | ReturnType<typeof changeCountOfPacksOnPageAC>
    | ReturnType<typeof sortCardsCountAC>;
