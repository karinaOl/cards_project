import { instance } from "../../../sc1-main/m3-dal/instance";

export const packsApi = {
    getCardsPacks(params: GetCardsPackRequestParamsType) {
        return instance.get<CardPacksResponseType>("cards/pack", { params });
    },
    createCardsPack(data: CreateCardsPackRequestDataType) {
        return instance.post<CreateCardsPackResponseType>("cards/pack", data);
    },
    deleteCardsPack(id: string) {
        return instance.delete<DeleteCardsPackResponseType>(`cards/pack/?id=${id}`);
    },
    updateCardsPack(data: UpDateCardsPackRequestDataType) {
        return instance.put<UpDateCardsPackResponseType>("cards/pack", { cardsPack: data });
    },
};

export type PackType = {
    _id: string;
    user_id: string;
    user_name: string;
    private: false;
    name: string;
    path: string;
    grade: number;
    shots: number;
    deckCover: string;
    cardsCount: number;
    type: string;
    rating: number;
    created: string;
    updated: string;
    more_id: string;
    __v: number;
};

export type CardPacksResponseType = {
    cardPacks: PackType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
};

export type GetCardsPackRequestParamsType = {
    packName?: string;
    min?: number;
    max?: number;
    sortPacks?: string;
    page?: number;
    pageCount?: number;
    user_id?: string;
    block?: boolean;
};

type CreateCardsPackRequestDataType = {
    cardsPack: {
        name: string;
        deckCover?: string;
        private?: boolean;
    };
};

type CreateCardsPackResponseType = {
    newCardsPack: PackType;
    token: string;
    tokenDeathTime: number;
};

type DeleteCardsPackResponseType = {
    deletedCardsPack: PackType;
    token: string;
    tokenDeathTime: number;
};

export type UpDateCardsPackRequestDataType = { _id: string } & Partial<Omit<PackType, "_id">>;

type UpDateCardsPackResponseType = {
    updatedCardsPack: PackType;
    token: string;
    tokenDeathTime: number;
};
