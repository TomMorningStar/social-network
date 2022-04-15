import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/features/application";
import Logo from "../../Images/user.png";

import styles from "./../Messages.module.css";

const Conversation = ({ conversation, userId }) => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userID = conversation.members.find((m) => m._id !== userId);
    // eslint-disable-next-line no-console
    setUser(userID);

    dispatch(getUser(userID?._id));
  }, [conversation.members, dispatch, user?.firstname, userId]);

  const userID = conversation.members.find((m) => m._id !== userId);
  return (
    <>
      <div className={styles.userMessageSend}>
        <div className={styles.userAvatar}>
          <img
            width={37}
            height={37}
            src={
              userID.avatar ? `http://localhost:4000/${userID?.avatar}` : Logo
            }
            alt=""
          />
        </div>
        <div className={styles.userNicknameSendMessage}>{user?.firstname}</div>
        <div className={styles.notic}></div>
      </div>
    </>
  );
};

export default Conversation;
