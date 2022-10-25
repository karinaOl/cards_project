import { instance } from "../../../sc1-main/m3-dal/instance";

export const cardsApi = {
    getCards(params: GetCardsRequestParamsType) {
        return instance.get<GetCardsResponseTYpe>("cards/card", { params });
    },
    createCard(cardData: CreateCardDataType) {
        return instance.post<CreateCardResponseType>("cards/card", cardData);
    },
    deleteCard(cardID: string) {
        return instance.delete<DeleteCardResponseType>(`card/card?id=${cardID}`);
    },
    updateCard(upDataCard: UpDateCardRequestDataType) {
        return instance.put<UpDataCardResponseType>("cards/card", upDataCard);
    },
};

export type CardType = {
    _id: string;
    cardsPack_id: string;
    user_id: string;
    question: string;
    answer: string;
    grade: number;
    shots: number;
    comments?: string;
    type?: string;
    rating?: number;
    more_id?: string;
    created: string;
    updated: string;
    __v?: number;
    answerImg?: string;
    answerVideo?: string;
    questionImg?: string;
    questionVideo?: string;
};

type GetCardsRequestParamsType = {
    cardAnswer?: string;
    cardQuestion?: string;
    cardsPack_id: string;
    min?: number;
    max?: number;
    sortCards?: number;
    grade?: number;
    pageCount?: number;
};

type GetCardsResponseTYpe = {
    cards: CardType[];
    packUserId: string;
    packName: string;
    packPrivate: boolean;
    packDeckCover: string;
    packCreated: string;
    packUpdated: string;
    page: number;
    pageCount: number;
    cardsTotalCount: number;
    minGrade: number;
    maxGrade: number;
    token: string;
    tokenDeathTime: number;
};

type CreateCardDataType = {
    card: {
        cardsPack_id: string;
        question?: string;
        answer?: string;
        grade?: number;
        shots?: number;
        answerImg?: string;
        questionImg?: string;
        questionVideo?: string;
        answerVideo?: string;
    };
};

type CreateCardResponseType = {
    newCard: CardType[];
    token: string;
    tokenDeathTime: number;
};

type DeleteCardResponseType = {
    deletedCard: CardType[];
    token: string;
    tokenDeathTime: number;
};

type UpDateCardRequestDataType = { _id: string } & Partial<Omit<CardType, "_id">>;

type UpDataCardResponseType = {
    updatedCard: CardType[];
    token: string;
    tokenDeathTime: number;
};
