import { GET_ROOM_ID } from "../actions";

const initialState = {
  roomId: [],
};

const roomReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload,
      };
    default:
      return state;
  }
};

export default roomReducer;
