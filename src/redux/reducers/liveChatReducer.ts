import { CLEAN_LIVE_CHAT, SET_LAST_MESSAGE, SET_LIVE_CHAT } from "../actions";

const initialState: any = {
  liveChat: [],
  lastMessage: true,
};

const liveChatReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LIVE_CHAT:
      return {
        ...state,
        liveChat: [...state.liveChat, action.payload],
      };

    case SET_LAST_MESSAGE:
      return {
        ...state,
        lastMessage: action.payload,
      };

    case CLEAN_LIVE_CHAT:
      return {
        liveChat: action.payload,
      };

    default:
      return state;
  }
};

export default liveChatReducer;
