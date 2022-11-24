import {
    cardsApi,
    CardType,
    CreateCardDataType,
    GetCardsRequestParamsType,
    GetCardsResponseType,
    UpdateCardRequestDataType,
} from "../dal/cards-api";
import { AppThunk } from "../../../sc1-main/m2-bll/store";
import { handleAppError } from "../../../utils/error-utils";
import { setIsLoadingAC } from "../../../sc1-main/m2-bll/appReducer";
import { successResponseUtils } from "../../../utils/successResponse-utils";

const initialState = {
    cards: [] as CardType[],
    cardAnswer: "",
    cardQuestion: "",
    cardsTotalCount: 0,
    packName: "",
    minGrade: 1,
    maxGrade: 4,
    sortCards: "0grade",
    page: 1,
    pageCount: 10,
    packUserId: "",
};

export const cardsReducer = (
    state: CardInitialStateType = initialState,
    action: SetCardsDataACType
): CardInitialStateType => {
    switch (action.type) {
        case "cards/SET-CARDS-DATA":
            return {
                ...state,
                ...action.data,
            };
        case "UPDATE-CARD-GRADE":
            return {
                ...state,
                cards: state.cards.map((card) =>
                    card._id === action.card_id ? { ...card, grade: action.grade } : card
                ),
            };

        default:
            return state;
    }
};

// Action Creators

export const setCardsDataAC = (data: GetCardsResponseType) =>
    ({ type: "cards/SET-CARDS-DATA", data } as const);

const updateCardGradeAC = (card_id: string, grade: number) =>
    ({
        type: "UPDATE-CARD-GRADE",
        grade,
        card_id,
    } as const);

// Thunk Creators

export const getCardsTC =
    (params: GetCardsRequestParamsType): AppThunk =>
    async (dispatch, getState) => {
        const { cardAnswer, cardQuestion, sortCards, pageCount, page, maxGrade, minGrade } =
            getState().cards;

        //todo: min, max

        const queryParams: GetCardsRequestParamsType = {
            cardAnswer,
            cardQuestion,
            sortCards,
            pageCount,
            page,
            // max: maxGrade,
            // min: minGrade,
            ...params,
        };
        // console.log(queryParams);
        dispatch(setIsLoadingAC(true));
        try {
            let response = await cardsApi.getCards(queryParams);
            dispatch(setCardsDataAC(response.data));
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
        }
    };

export const addCardTC =
    (newCard: CreateCardDataType): AppThunk =>
    async (dispatch) => {
        dispatch(setIsLoadingAC(true));
        try {
            await cardsApi.createCard(newCard);
            await dispatch(getCardsTC({ cardsPack_id: newCard.card.cardsPack_id }));
            const successMessage = `New Card was added`;
            successResponseUtils(successMessage, dispatch);
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
        }
    };

export const deleteCardTC =
    (cardsPack_ID: string, cardID: string): AppThunk =>
    async (dispatch, getState) => {
        const cardsArrLength = getState().cards.cards.length;
        let currentPage = getState().cards.page;

        if (cardsArrLength === 1 && currentPage !== 1) {
            currentPage -= 1;
        }
        dispatch(setIsLoadingAC(true));
        try {
            await cardsApi.deleteCard(cardID);
            await dispatch(getCardsTC({ cardsPack_id: cardsPack_ID, page: currentPage }));
            const successMessage = `Card was deleted`;
            successResponseUtils(successMessage, dispatch);
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
        }
    };

export const updateCardTC =
    (cardsPack_ID: string, updatedCard: UpdateCardRequestDataType): AppThunk =>
    async (dispatch) => {
        dispatch(setIsLoadingAC(true));
        try {
            await cardsApi.updateCard(updatedCard);
            const successMessage = "Card was changed";
            successResponseUtils(successMessage, dispatch);
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
            dispatch(getCardsTC({ cardsPack_id: cardsPack_ID }));
        }
    };

export const upgradeCardGradeTC =
    (card_id: string, grade: number): AppThunk =>
    async (dispatch) => {
        dispatch(setIsLoadingAC(true));
        try {
            await cardsApi.updateCardsGrade(card_id, grade);
            dispatch(updateCardGradeAC(card_id, grade));
        } catch (e) {
            console.log(e);
        } finally {
            dispatch(setIsLoadingAC(false));
        }
    };

type CardInitialStateType = typeof initialState;
type SetCardsDataACType = ReturnType<typeof setCardsDataAC> | ReturnType<typeof updateCardGradeAC>;
export type CardsActionType = SetCardsDataACType;
