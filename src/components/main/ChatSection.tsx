/* eslint-disable react-hooks/exhaustive-deps */
import { Col, FormControl, Form } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import { SlOptionsVertical, SlEmotsmile } from "react-icons/sl";
import { RiAttachment2 } from "react-icons/ri";
import { BsFillMicFill } from "react-icons/bs";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import SingleMessage from "./SingleMessage";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IUser } from "../../redux/interfaces/IUser";
import { SET_LAST_MESSAGE, SET_LIVE_CHAT } from "../../redux/actions";

const socket = io(process.env.REACT_APP_BE_URL!, { transports: ["websocket"] });

const ChatSection = () => {
  let currentChat = useAppSelector((state) => state.currentChat.chat);
  let currentUser = useAppSelector((state) => state.currentUser.currentUser);
  let livechat = useAppSelector((state) => state.liveChat.liveChat);
  let lastMessage = useAppSelector((state) => state.liveChat);

  let otherUser = currentChat?.members?.filter(
    (user: IUser) => !(user._id === currentUser._id)
  );

  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("welcome", (welcomeMessage) => {
      // console.log(welcomeMessage);
    });
    socket.emit("joinRoom", currentChat._id);
    socket.on("newMessage", (newMessage) => {
      dispatch({
        type: SET_LIVE_CHAT,
        payload: newMessage.message,
      });
      dispatch({
        type: SET_LAST_MESSAGE,
        payload: !lastMessage,
      });
      console.log(newMessage);
    });
  }, []);

  const sendMessage = () => {
    const newMessage = {
      sender: currentUser,
      text: message,
      createdAt: new Date().toLocaleString("en-GB"),
      chatId: currentChat._id,
    };
    socket.emit("sendMessage", { message: newMessage });
    dispatch({
      type: SET_LIVE_CHAT,
      payload: newMessage,
    });
  };

  return (
    <Col className="col-12 col-md-9 p-0 mt-3 border-left border-secondary d-flex flex-column">
      <div className="d-flex top-bars align-items-center">
        <div className="flex-grow-1 d-flex align-items-center">
          {otherUser && (
            <>
              {" "}
              <img
                src={otherUser[0]?.avatar}
                alt="User's avatar"
                className="top-images my-2 mx-3"
              />
              <p className="mb-0" style={{ color: "#d9dee0" }}>
                {otherUser[0]?.username}
              </p>
            </>
          )}
        </div>

        <div className="d-flex">
          <AiOutlineSearch className="top-icons m-1 mx-3" />
          <SlOptionsVertical className="top-icons m-1 mx-3" />
        </div>
      </div>
      <div className="messages-section flex-grow-1 d-flex flex-column py-2">
        <>
          {currentChat?.messages?.map((message: any, index: number) => (
            <SingleMessage data={message} key={index} />
          ))}

          {livechat?.map((message: any, index: number) => (
            <SingleMessage data={message} key={index} />
          ))}
          {/* {console.log("livechat", livechat)} */}
        </>
      </div>
      <div className="d-flex align-items-center py-2 px-2 top-bars">
        <SlEmotsmile className="top-icons mx-2" />
        <RiAttachment2 className="top-icons mx-2" />
        <Form
          className="message-container"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
            setMessage("");
          }}
        >
          <FormControl
            placeholder="Your message..."
            className="top-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form>
        <BsFillMicFill className="top-icons mx-3" />
      </div>
    </Col>
  );
};

export default ChatSection;
