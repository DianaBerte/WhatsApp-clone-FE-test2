import { createChat } from "../../redux/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IUser } from "../../redux/interfaces/IUser";

interface IProps {
    data: IUser;
    hideUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleUser = (props: IProps) => {
    let currentUser = useAppSelector((state) => state.currentUser.currentUser);
    const dispatch = useAppDispatch();
    const bothUsers = { members: [props.data._id, currentUser._id] };

    const handleChats = () => {
        dispatch(createChat(bothUsers, currentUser._id));
        props.hideUsers(false);
    };

    return (
        <div
            className="my-2 single-user"
            onClick={() => {
                handleChats();
            }}
        >
            <div className="d-flex align-items-center ml-3 my-2">
                <div className="d-flex align-items-center justify-content-center img-container">
                    <img src={props.data?.avatar} alt="trollface" />
                </div>
                <div className="d-flex flex-grow-1 mx-3 single-user-data align-items-center">
                    <div className="my-3">
                        <p className="mb-0">{props.data.username}</p>
                        <span>{props.data.email}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleUser;
