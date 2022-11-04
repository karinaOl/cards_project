import {
    AnyAction,
    applyMiddleware,
    combineReducers,
    legacy_createStore as createStore,
} from "redux";
import { LoginActionType, loginReducer } from "../../sc2-features/f1-auth/Login/bll/loginReducer";
import {
    NewPasswordActionType,
    newPasswordReducer,
} from "../../sc2-features/f1-auth/New-password/bll/newPasswordReducer";
import {
    RecoveryPasswordActionType,
    recoveryPasswordReducer,
} from "../../sc2-features/f1-auth/Recovery-password/bll/recoveryPasswordReducer";
import {
    RegistrationActionType,
    registrationReducer,
} from "../../sc2-features/f1-auth/Registration/bll/registrationReducer";
import {
    ProfileActionType,
    profileReducer,
} from "../../sc2-features/f2-profile/bll/profileReducer";
import thunk, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer } from "./appReducer";
import { PacksActionType, packsReducer } from "../../sc2-features/f3-packs/bll/packsReducer";
import { CardsActionType, cardsReducer } from "../../sc2-features/f4-cards/bll/cardsReducer";
import {
    SettingsActionsType,
    settingsReducer,
} from "../../sc2-features/f3-packs/bll/settingsReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    newPassword: newPasswordReducer,
    recoveryPassword: recoveryPasswordReducer,
    registration: registrationReducer,
    profile: profileReducer,
    app: appReducer,
    packs: packsReducer,
    cards: cardsReducer,
    settings: settingsReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootReducerType = ReturnType<typeof rootReducer>;
type ActionType =
    | LoginActionType
    | NewPasswordActionType
    | RecoveryPasswordActionType
    | RegistrationActionType
    | ProfileActionType
    | PacksActionType
    | CardsActionType
    | SettingsActionsType;

export type AppDispatch = ThunkDispatch<RootReducerType, unknown, ActionType>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootReducerType,
    unknown,
    AnyAction
>;

// @ts-ignore
window.store = store;
