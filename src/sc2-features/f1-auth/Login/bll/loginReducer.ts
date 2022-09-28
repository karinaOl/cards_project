const initialState = {}

export const loginReducer = (state: LoginInitialStateType = initialState, action: LoginActionType): LoginInitialStateType => {
    switch (action.type) {
        case "LOGIN":
            return {...state}
        default:
            return state
    }
}

const actionC = () => ({type: "LOGIN"} as const)

export type LoginInitialStateType = typeof initialState;
export type LoginActionType = ReturnType<typeof actionC>