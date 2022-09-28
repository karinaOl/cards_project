const initialState = {}

export const registrationReducer = (state: RegistrationInitialStateType = initialState, action: RegistrationActionType): RegistrationInitialStateType => {
    switch (action.type) {
        case "REGISTER":
            return {...state}
        default:
            return state
    }
}

const actionC = () => ({type: "REGISTER"} as const)

export type RegistrationInitialStateType = typeof initialState;
export type RegistrationActionType = ReturnType<typeof actionC>