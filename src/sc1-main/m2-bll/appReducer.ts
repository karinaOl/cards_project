const initialState = {
    error: null as null | string,
    isLoading: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case "app/SET-ERROR":
            return {...state, error: action.error}
        case "app/SET-IS-LOADING":
            return {...state, isLoading: action.value}
        default:
            return state
    }
}

export const setAppErrorAC = (error: null | string) => ({type: "app/SET-ERROR", error} as const)
export const setIsLoadingAC = (value: boolean) => ({type: "app/SET-IS-LOADING", value} as const)

type InitialStateType = typeof initialState;
export type AppActionType =
    ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setIsLoadingAC>