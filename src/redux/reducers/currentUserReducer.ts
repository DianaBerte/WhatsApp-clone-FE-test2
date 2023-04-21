import { SET_CURRENT_USER } from "../actions";

const initialState = {
    currentUser: {},
}

const currentUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        default:
            return state
    }
}

export default currentUserReducer