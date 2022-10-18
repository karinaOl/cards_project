const initialState = {
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "app/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppError = (error: null | string) => ({type: "app/SET-ERROR", error} as const)

type InitialStateType = typeof initialState;
export type AppActionType = ReturnType<typeof setAppError>