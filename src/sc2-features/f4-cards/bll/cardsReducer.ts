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

const initialState = {
    cards: [] as CardType[],
    cardAnswer: "",
    cardQuestion: "",
    cardsTotalCount: 0,
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
        case "UPDATE-CARDS-GRADE":
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

const setCardsDataAC = (data: GetCardsResponseType) =>
    ({ type: "cards/SET-CARDS-DATA", data } as const);

const updateCardsGradeAC = (grade: number, card_id: string) =>
    ({
        type: "UPDATE-CARDS-GRADE",
        grade,
        card_id,
    } as const);

// Thunk Creators

export const getCardsTC =
    (params: GetCardsRequestParamsType): AppThunk =>
    async (dispatch, getState) => {
        const { cardAnswer, cardQuestion, sortCards, pageCount, page, maxGrade, minGrade } =
            getState().cards;

        const queryParams: GetCardsRequestParamsType = {
            cardAnswer,
            cardQuestion,
            sortCards,
            pageCount,
            page,
            max: maxGrade,
            min: minGrade,
            ...params,
        };
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
            dispatch(getCardsTC({ cardsPack_id: newCard.card.cardsPack_id }));
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
            dispatch(getCardsTC({ cardsPack_id: cardsPack_ID, page: currentPage }));
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
        } catch (e) {
            handleAppError(e, dispatch);
        } finally {
            dispatch(setIsLoadingAC(false));
            dispatch(getCardsTC({ cardsPack_id: cardsPack_ID }));
        }
    };

export const updateCardsGradeTC =
    (grade: number, card_id: string): AppThunk =>
    async (dispatch) => {
        try {
            await cardsApi.updateCardsGrade(grade, card_id);
            dispatch(updateCardsGradeAC(grade, card_id));
        } catch (e) {
            console.log(e);
        }
    };

type CardInitialStateType = typeof initialState;
type SetCardsDataACType = ReturnType<typeof setCardsDataAC> | ReturnType<typeof updateCardsGradeAC>;
export type CardsActionType = SetCardsDataACType;
