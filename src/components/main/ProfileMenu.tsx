import { Button, Col, Modal } from "react-bootstrap";
import { FiLogOut } from "react-icons/fi";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { useNavigate } from "react-router";
import { Form } from "react-bootstrap";
import { CLEAR_CHAT_HISTORY, setCurrentUser } from "../../redux/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import Cookies from "js-cookie";

interface IProps {
  showProfileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileMenu = (props: IProps) => {
  let currentUserInfo = useAppSelector(
    (state) => state.currentUser.currentUser
  );
  const [newUsername, setNewUsername] = useState(currentUserInfo.username);
  const [newInfo, setNewInfo] = useState(currentUserInfo.info);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const accessToken = localStorage.getItem("accessToken");
  const changeAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      const formData = new FormData();
      formData.append("avatar", file!);
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users/me/avatar`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.ok) {
        const updatedUser = await res.json();
        // console.log(updatedUser);
        dispatch(setCurrentUser(updatedUser.user));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserInfo = async () => {
    const updatedUser = {
      username: newUsername,
      info: newInfo,
    };
    // console.log(updatedUser);
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_URL}/users/me`, {
        method: "PUT",
        body: JSON.stringify(updatedUser),
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const response = await res.json();
        // console.log("response: ", response);
        dispatch(setCurrentUser(response));
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    const emptyUser = {
      _id: "",
      username: "",
      email: "",
      info: "",
      avatar: "",
    };
    localStorage.removeItem("accessToken");
    dispatch(setCurrentUser(emptyUser));
    dispatch({
      type: CLEAR_CHAT_HISTORY,
      payload: {},
    });
    Cookies.remove("accessToken");
    navigate("/");
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Choose your new username:</Form.Label>
              <Form.Control
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Choose your new description:</Form.Label>
              <Form.Control
                value={newInfo}
                onChange={(e) => setNewInfo(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateUserInfo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Col className="col-12 col-md-3 mt-3 p-0">
        <div className="d-flex new-chat-section align-items-end">
          <div className="d-flex">
            <svg
              onClick={() => props.showProfileMenu(false)}
              className="pointer-cursor"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              preserveAspectRatio="xMidYMid meet"
              version="1.1"
              x="0px"
              y="0px"
              enableBackground="new 0 0 24 24"
              xmlSpace="preserve"
            >
              <path
                fill="#d9dee0"
                d="M12,4l1.4,1.4L7.8,11H20v2H7.8l5.6,5.6L12,20l-8-8L12,4z"
              ></path>
            </svg>
            <h5 className="ml-3" style={{ color: "#d9dee0" }}>
              Profile
            </h5>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center my-4">
          <div className="big-image-container">
            <img src={currentUserInfo?.avatar} alt="avatar" />
          </div>
        </div>
        <label className="change-avatar-input">
          {" "}
          <MdOutlinePhotoCamera />
          <input className="input" type="file" onChange={changeAvatar} />
        </label>
        <div
          className="profile-info"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="my-2">
            <div className="contacts-text profile-title">Your name</div>
            <div className="d-flex justify-content-between">
              <p className="userNameFormInput"> {currentUserInfo.username}</p>
              <button className="updateButton" onClick={handleShow}>
                <div>
                  <svg
                    className="pointer-cursor"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.1"
                    x="0px"
                    y="0px"
                    enable-background="new 0 0 24 24"
                    xmlSpace="preserve"
                  >
                    <path
                      fill="currentColor"
                      d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="my-4 profile-title">
            This is not your username or pin. This name will be visible to your
            WhatsApp contacts.
          </div>
          <div className="my-2">
            <div className="contacts-text profile-title">Info</div>
            <div className="d-flex justify-content-between">
              <p className="userInfoFormInput">{currentUserInfo.info}</p>
              <button className="updateButton" onClick={handleShow}>
                <div>
                  <svg
                    className="pointer-cursor"
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    preserveAspectRatio="xMidYMid meet"
                    version="1.1"
                    x="0px"
                    y="0px"
                    enable-background="new 0 0 24 24"
                    xmlSpace="preserve"
                  >
                    <path
                      fill="currentColor"
                      d="M3.95,16.7v3.4h3.4l9.8-9.9l-3.4-3.4L3.95,16.7z M19.75,7.6c0.4-0.4,0.4-0.9,0-1.3 l-2.1-2.1c-0.4-0.4-0.9-0.4-1.3,0l-1.6,1.6l3.4,3.4L19.75,7.6z"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className="my-2">
            <button className="logoutButton" onClick={logout}>
              Log out from this account. <FiLogOut />
            </button>
          </div>
        </div>
      </Col>
    </>
  );
};

export default ProfileMenu;
