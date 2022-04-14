import React, { useEffect } from "react";
import styles from "./User.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "../Images/user.png";
import style from "../profile/Profile.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addFollow,
  blockUser,
  removeFollow,
} from "../../redux/features/application";
import { getConversations, postConversation } from "../../redux/features/conversation";
import Followers from "../profile/followers/Followers";
import Subscribers from "../profile/followers/Subscribers";

const HeaderUser = ({ image, loading, firstname, lastname, id, userId , posts}) => {
  const dispatch = useDispatch();
  const handleRemoveFollow = () => {
    dispatch(removeFollow(userId));
  };
  useEffect(() => {
    dispatch(getConversations(id));
  }, [userId]);

  const handleAddFreind = () => {
    dispatch(addFollow(userId));
  };
  const conversations = useSelector((state) => state.conversation.conversation);
  const handleSendMess = (id1) => {

    for (let j = 0; j < conversations.length; j++){
      for(let i = 0; i< conversations[j].members.length; i++){
        if(conversations[j].members[i]._id === id1||conversations[j].members[i]._id === id )
          if(conversations[j].members[i+1]?._id === id||conversations[j].members[i+1]?._id === id1){
            return true
          }
      }
    }
    
      dispatch(postConversation(id1))
      

 


  };
  const { user, searchUser } = useSelector((state) => state.application);
 
  const follows = user?.follows;
  const follow = follows?.includes(userId.id);

  const [subscription, setSubscription] = React.useState(false);
  const [getFollows, setGetFollows] = React.useState(false);

  const handleGetSubscription = () => {
    setGetFollows(false)
    setSubscription(!subscription);
  };

  const handleGetFollows = () => {
    setSubscription(false)
    setGetFollows(!getFollows);
  };

  const handleUserBlock = () => {
    dispatch(blockUser(userId.id));
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.headerImg}>
          {loading ? (
            <div className={styles.headerImgWrap}>
              <CircularProgress />
            </div>
          ) : (
            <div className={styles.headerImgWrap}>
              <img
                src={image ? `http://localhost:4000/${image}` : Logo}
                alt="profile"
              />
            </div>
          )}
        </div>
        <div className={styles.headerDescription}>
          <div className={styles.descriptionEdit}>
            <h2>{`${firstname} ${lastname}`}</h2>
          </div>
          <div className={styles.descriptionPosts}>
            <div className={styles.followsWrap}>
              <b>{posts.length}</b> публикаций
            </div>
            <div onClick={handleGetFollows} className={styles.followsWrap}>
              <b>{posts[0]?.user?.freinds?.length}</b> подписчиков
            </div>

            <div  onClick={handleGetSubscription} className={styles.followsWrap}>
              <b>{posts[0]?.user?.follows?.length}</b> подписок


            </div>
            {getFollows && (
              <div className={styles.followComponentWrap}>
                <Followers user={searchUser} id = {userId._id} setFollows={setGetFollows}  />
              </div>
            )}
            {subscription && (
              <div className={styles.subscriptionComponentWrap}>
                <Subscribers user={searchUser} id = {userId._id} setSubscription={setSubscription}  />
              </div>
            )}
          </div>
          {user?.role === "admin" ? (
            <>
              <button className={styles.otpiska} onClick={handleUserBlock}>
                Заблокировать пользователя
              </button>
            </>
          ) : follow ? (
            <>
              <button className={styles.otpiska} onClick={handleRemoveFollow}>
                Отписаться
              </button>
              <Link to="/messages"
                onClick={() => handleSendMess(userId.id)}
                style={{ marginLeft: "10px" }}
                className={styles.otpiska}
              >
                Отправить сообщение
              </Link>
            </>
          ) : (
            <>
              <button className={styles.otpiska} onClick={handleAddFreind}>
                Подписаться
              </button>
              <Link to="/messages"
                onClick={() => handleSendMess(userId.id)}
                style={{ marginLeft: "10px" }}
                className={styles.otpiska}
              >
                Отправить сообщение
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={style.menuMain}>
        <Link className={style.menuLink} to="/public">
          <svg
            aria-label=""
            className="_8-yf5 "
            color="#262626"
            fill="#262626"
            height="12"
            role="img"
            viewBox="0 0 24 24"
            width="12"
          >
            <rect
              fill="none"
              height="18"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              width="18"
              x="3"
              y="3"
            ></rect>
            <line
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              x1="9.015"
              x2="9.015"
              y1="3"
              y2="21"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              x1="14.985"
              x2="14.985"
              y1="3"
              y2="21"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              x1="21"
              x2="3"
              y1="9.015"
              y2="9.015"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              x1="21"
              x2="3"
              y1="14.985"
              y2="14.985"
            ></line>
          </svg>
          <div className={style.menuText}>ПУБЛИКАЦИИ</div>
        </Link>
      </div>
    </>
  );
};

export default HeaderUser;
