import { instance } from "../../../sc1-main/m3-dal/instance";

export const packsApi = {
    getCardsPacks(params: GetCardsPackRequestParamsType) {
        return instance.get<CardPacksResponseType>("cards/pack", { params });
    },
    createPacks(params: CreateCardsPackRequestParamsType) {
        return instance.post<CreateCardsPackResponseType>("cards/pack", { params });
    },
    deletePacks(id: string) {
        return instance.delete<DeleteCardsPackResponseType>(`cards/pack/?id=${id}`);
    },
    putPacks(params: UpDateCardsPackRequestParamsType) {
        return instance.put<UpDateCardsPackResponseType>("cards/pack");
    },
};

type PackType = {
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

type CardPacksResponseType = {
    cardPacks: PackType[];
    page: number;
    pageCount: number;
    cardPacksTotalCount: number;
    minCardsCount: number;
    maxCardsCount: number;
    token: string;
    tokenDeathTime: number;
};

type GetCardsPackRequestParamsType = {
    packName?: string;
    min?: number;
    max?: number;
    sortPacks?: string;
    page?: number;
    user_id?: string;
    block?: boolean;
};

type CreateCardsPackRequestParamsType = {
    cardsPack: {
        name: string;
        deckCover?: string;
        private: false;
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

type UpDateCardsPackRequestParamsType = {
    cardsPack: {
        id: string;
        name?: string;
    };
};

type UpDateCardsPackResponseType = {
    updatedCardsPack: PackType;
    token: string;
    tokenDeathTime: number;
};
