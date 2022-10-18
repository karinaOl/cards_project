const initialState = {};

export const newPasswordReducer = (
    state: NewPasswordInitialStateType = initialState,
    action: NewPasswordActionType
): NewPasswordInitialStateType => {
    switch (action.type) {
        case "NEW_PASSWORD":
            return { ...state };
        default:
            return state;
    }
};

const actionC = () => ({ type: "NEW_PASSWORD" } as const);

export type NewPasswordInitialStateType = typeof initialState;
export type NewPasswordActionType = ReturnType<typeof actionC>;
