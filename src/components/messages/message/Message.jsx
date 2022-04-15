import React from "react";
import styles from "./../Messages.module.css";
import { format } from "timeago.js";
import Logo from "../../Images/user.png";
import { useSelector } from "react-redux";

const Message = ({ message, userId, convers }) => {
  const user = useSelector((state) => state.application.user);
  const conversation = convers?.find(
    (conversOne) => conversOne._id === message.conversationId
  );
  const sender = conversation?.members?.find((user) => user._id !== userId);

  const host = "http://localhost:4000/";
  const imgUser = message?.sender?.avatar
    ? message?.sender?.avatar
    : user?.avatar;
  const sendUser = sender?.avatar ? host + sender?.avatar : Logo;

  const yourAvatar = host + imgUser;
  return (
    <div>
      {message.sender._id === userId ? (
        <div className={styles.userRecWrapper}>
          <div className={styles.messagesSend}>
            {message.text}
            <div className={styles.timeOut}>{format(message.createdAt)}</div>
          </div>
          <div className={styles.userAvatar}>
            <img width={37} height={37} src={yourAvatar} alt="" />
          </div>
        </div>
      ) : (
        <div className={styles.userSendWrapper}>
          <div className={styles.userAvatar}>
            <img width={37} height={37} src={sendUser} alt="" />
          </div>
          <div className={styles.messagesSend}>
            {message.text}
            <div className={styles.timeOut}>{format(message.createdAt)}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
