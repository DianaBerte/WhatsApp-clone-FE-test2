import { useAppSelector } from "../../redux/hooks";

interface IProps {
  data: any;
}

const SingleMessage = (props: IProps) => {
  let currentUser = useAppSelector((state) => state.currentUser.currentUser);
  let currentRoom = useAppSelector((state) => state.room.roomId);

  return (
    <>
      {props.data.chatId === currentRoom &&
      props.data.sender?._id === currentUser?._id ? (
        <div className="d-flex flex-row-reverse pr-5">
          <div className="chat-message-user mb-1 mx-5 p-1">
            <p className="mb-0 mx-2">{props.data.text}</p>
            <span className="mx-2 float-right">{props.data.createdAt}</span>
          </div>
        </div>
      ) : (
        props.data.chatId === currentRoom && (
          <div className="pl-5">
            <div className="chat-message mb-1 mx-5 p-1">
              <p className="mb-0 mx-2">{props.data.text}</p>
              <span className="mx-2 float-right">{props.data.createdAt}</span>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default SingleMessage;
