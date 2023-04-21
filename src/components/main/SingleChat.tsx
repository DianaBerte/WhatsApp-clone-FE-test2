import { IChats } from "../../redux/interfaces/IChats";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  CLEAN_LIVE_CHAT,
  GET_ROOM_ID,
  getChatHistory,
} from "../../redux/actions";
import { useEffect, useState } from "react";

interface IProps {
  data: IChats;
}

let lastMessage: any;

const SingleChat = (props: IProps) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);
  const livechat = useAppSelector((state) => state.liveChat.liveChat);

  // console.log("this", props.data);
  // console.log("this", livechat);

  lastMessage = props.data.messages[props.data.messages.length - 1];

  const notCurrentUser = props.data.members.filter(
    (user) => !(user?._id === currentUser?._id)
  );

  const handleChats = (chatId: string) => {
    dispatch(getChatHistory(chatId));
    dispatch({ type: GET_ROOM_ID, payload: props.data._id });
    dispatch({ type: CLEAN_LIVE_CHAT, payload: [] });
  };

  // function getLastMessageById() {
  //   return livechat.reduce((acc: any, message: any) => {
  //     if (message.chatId === props.data._id) {
  //       return (lastMessage = message);
  //     }
  //     return acc;
  //   }, null);
  // }

  // useEffect(() => {
  //   getLastMessageById();
  //   // console.log("this", lastMessage);
  // }, [livechat]);

  return (
    <div
      className="my-2 single-chats"
      onClick={() => {
        handleChats(props.data?._id);
      }}
    >
      <div className="d-flex align-items-center ml-3 my-2">
        <div className="d-flex align-items-center justify-content-center img-container">
          <img src={notCurrentUser[0]?.avatar} alt="trollface" />
        </div>
        <div className="d-flex flex-grow-1 ml-3 align-items-center">
          <div className="flex-grow-1 my-3">
            <p className="mb-0">{notCurrentUser[0]?.username}</p>
            <span>{lastMessage?.text}</span>
          </div>
          <span className="mr-3">{lastMessage?.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleChat;
