import ChatSection from "./ChatSection";
import LeftBar from "./LeftBar";
import { Container, Row } from "react-bootstrap";
import UsersMenu from "./UsersMenu";
import { useState, useEffect } from "react";
import ProfileMenu from "./ProfileMenu";
import {
  SET_LAST_MESSAGE,
  getUsers,
  setCurrentUser,
} from "../../redux/actions";
import { useAppDispatch } from "../../redux/hooks";
import Cookies from "js-cookie";

const Main = () => {
  const dispatch = useAppDispatch();
  const [showUsersMenu, setShowUsersMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [toggle, setToggle] = useState(false);

  const getMeInfo = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        let userInfoFromGoogle = await res.json();
        dispatch(setCurrentUser(userInfoFromGoogle));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const tokenCookie = Cookies.get("accessToken");
    if (tokenCookie) {
      localStorage.setItem("accessToken", tokenCookie);
      getMeInfo();
    }
    dispatch(getUsers());
    dispatch({ type: SET_LAST_MESSAGE, payload: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {localStorage.getItem("accessToken") || Cookies.get("accessToken") ? (
        <Container fluid className="main-page px-5 pb-3 d-flex">
          <Row className="flex-grow-1">
            {!showUsersMenu && !showProfileMenu && (
              <LeftBar
                showUsersMenu={setShowUsersMenu}
                showProfileMenu={setShowProfileMenu}
              />
            )}
            {showUsersMenu && <UsersMenu showUsersMenu={setShowUsersMenu} />}
            {showProfileMenu && (
              <ProfileMenu showProfileMenu={setShowProfileMenu} />
            )}
            <ChatSection />
          </Row>
        </Container>
      ) : (
        window.location.replace("/")
      )}
    </>
  );
};

export default Main;
