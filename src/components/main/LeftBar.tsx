import { Col, FormControl, InputGroup } from "react-bootstrap";
import { FaUserFriends } from "react-icons/fa";
import { RiLoader3Line, RiMessage2Fill } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import SingleChat from "./SingleChat";
import { useEffect, useState } from "react";
import { getChats } from "../../redux/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IChats } from "../../redux/interfaces/IChats";

interface IProps {
  showUsersMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const LeftBar = (props: IProps) => {
  const dispatch = useAppDispatch();
  let currentUser = useAppSelector((state) => state.currentUser.currentUser);
  let chats = useAppSelector((state) => state.chats.allChats);
  const [query, setQuery] = useState("");

  useEffect(() => {
    dispatch(getChats(currentUser._id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Col className="p-0 col-12 col-md-3">
      <div className="d-flex top-bars mt-3 align-items-center">
        <div
          onClick={() => props.showProfileMenu(true)}
          className="flex-grow-1 pointer-cursor"
        >
          <img
            src={currentUser?.avatar}
            alt="User's avatar"
            className="top-images my-2 mx-3"
          />
        </div>

        <div className="d-flex">
          <FaUserFriends className="top-icons m-1 mx-3" />
          <RiLoader3Line className="top-icons m-1 mx-3" />
          <RiMessage2Fill
            className="top-icons m-1 mx-3"
            onClick={() => props.showUsersMenu(true)}
          />
          <SlOptionsVertical className="top-icons m-1 mx-3" />
        </div>
      </div>
      <div className="d-flex align-items-center">
        <InputGroup className="my-2 ml-3 top-input-main">
          <InputGroup.Prepend>
            <InputGroup.Text className="top-input">
              <AiOutlineSearch className="top-search" />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Search for a chat"
            className="top-input top-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
        <BsFilter className="top-icons top-filter m-1 mx-3" />
      </div>
      <div className="single-chats-container">
        {chats.success === false ? (
          <div className="m-3">Create a new chat to start</div>
        ) : (
          chats
            .filter((chat: IChats) =>
              chat.members.find(
                (member: any) =>
                  member._id !== currentUser._id &&
                  member.username.toLowerCase().includes(query.toLowerCase())
              )
            )
            .map((e: IChats, i: number) => {
              return <SingleChat key={i} data={e} />;
            })
        )}
      </div>
    </Col>
  );
};

export default LeftBar;
