import { GetCardsPackRequestParamsType } from "../dal/packs-api";

const initialState = {
    user_id: "",
    packName: "",
    min: 0,
    max: 110,
    sortPacks: "",
    page: 1,
    pageCount: 10,
    block: false,
};

export type InitialStateSettingType = typeof initialState;

export const settingsReducer = (
    state: InitialStateSettingType = initialState,
    action: SettingsActionsType
): InitialStateSettingType => {
    switch (action.type) {
        case "settings/RESET-DATA": {
            return { ...state, ...action.data };
        }
        default:
            return state;
    }
};

//Action creators

export const resetSettingsAC = (data: GetCardsPackRequestParamsType) =>
    ({ type: "settings/RESET-DATA", data } as const);

//Types
export type SettingsActionsType = ReturnType<typeof resetSettingsAC>;
