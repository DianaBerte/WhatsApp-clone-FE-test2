import { CLEAR_CHAT_HISTORY, GET_CHAT_HISTORY } from "../actions";

const initialState = {
  chat: [],
};

const currentChatReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CHAT_HISTORY:
      return {
        ...state,
        chat: action.payload,
      };
    case CLEAR_CHAT_HISTORY:
      return {
        ...state,
        chat: action.payload,
      };
    default:
      return state;
  }
};

export default currentChatReducer;
