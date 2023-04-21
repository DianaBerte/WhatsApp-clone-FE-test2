import { GET_CHATS } from "../actions";

const initialState = {
  allChats: [],
};

const chatReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CHATS:
      return {
        ...state,
        allChats: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
