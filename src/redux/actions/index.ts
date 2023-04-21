import { IUser } from "../interfaces/IUser";

export const SET_USER_INFO = "SET_USER_INFO";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const GET_CHATS = "GET_CHATS";
export const GET_CHAT_HISTORY = "GET_CHAT_HISTORY";
export const CLEAR_CHAT_HISTORY = "CLEAR_CHAT_HISTORY";
export const SET_LIVE_CHAT = "SET_LIVE_CHAT";
export const CLEAN_LIVE_CHAT = "CLEAN_LIVE_CHAT";
export const GET_ROOM_ID = "GET_ROOM_ID";
export const SET_LAST_MESSAGE = "SET_LAST_MESSAGE";

export const setUserInfo = (user: IUser) => {
  return {
    type: SET_USER_INFO,
    payload: { userInfo: user },
  };
};

export const setCurrentUser = (currentUser: IUser) => {
  return {
    type: SET_CURRENT_USER,
    payload: currentUser,
  };
};

export const getUsers = () => {
  return async (dispatch: any) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BE_URL}/users`);
      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        dispatch({
          type: SET_USER_INFO,
          payload: data,
        });
      } else {
        console.log("Error fetching users!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getChats = (userId: String) => {
  return async (dispatch: any) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BE_URL}/chats/${userId}`
      );
      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: GET_CHATS,
          payload: data,
        });
      } else {
        console.log("Error fetching chats!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const createChat = (members: Object, currentUser: String) => {
  return async (dispatch: any) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BE_URL}/chats`, {
        method: "POST",
        body: JSON.stringify(members),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        dispatch(getChats(currentUser));
      } else {
        console.log("Error creating a chat!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getChatHistory = (chatId: string) => {
  return async (dispatch: any) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BE_URL}/chats/singleChat/${chatId}`
      );
      if (res.ok) {
        const data = await res.json();
        dispatch({
          type: GET_CHAT_HISTORY,
          payload: data,
        });
      } else {
        console.log("Error getting chat history!");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
