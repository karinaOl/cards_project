
const initialState = {}

export const profileReducer = (state:ProfileInitialStateType = initialState, action: ProfileActionType): ProfileInitialStateType  => {
    switch (action.type) {
        case "PROFILE":
            return {...state}
        default: return state
    }
}

const actionC = () => ({type: "PROFILE"}as const)

export type ProfileInitialStateType = typeof initialState;
export type ProfileActionType = ReturnType<typeof actionC>