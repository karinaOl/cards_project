const initialState = {}

export const recoveryPasswordReducer = (state: RecoveryPasswordInitialStateType = initialState, action: RecoveryPasswordActionType): RecoveryPasswordInitialStateType => {
    switch (action.type) {
        case "RECOVERY":
            return {...state}
        default:
            return state
    }
}

const actionC = () => ({type: "RECOVERY"} as const)

export type RecoveryPasswordInitialStateType = typeof initialState;
export type RecoveryPasswordActionType = ReturnType<typeof actionC>