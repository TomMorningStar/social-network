import React from "react";

import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Logo from "../../Images/user.png";
import styles from "../Profile.module.css";
import { useSelector } from "react-redux";

import Followers from "../followers/Followers";
import Subscribers from "../followers/Subscribers";


const HeaderForUser = () => {
  const { posts } = useSelector((state) => state.posts);

  const [subscription, setSubscription] = React.useState(false);
  const [follows, setFollows] = React.useState(false);

  const handleGetSubscription = () => {
    setFollows(false)
    setSubscription(!subscription);
  };
  const { user, loading } = useSelector((state) => state.application);

  const handleGetFollows = () => {
    setSubscription(false)
    setFollows(!follows);
  };

  return loading ? (
    "loading..."
  ) : (
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
                src={
                  user?.avatar ? `http://localhost:4000/${user?.avatar}` : Logo
                }
                alt="profile"
              />
            </div>
          )}
        </div>
        <div className={styles.headerDescription}>
          <div className={styles.descriptionEdit}>
            <h2>{`${user?.firstname} ${user?.lastname}`}</h2>
            <div className={styles.descriptionEditButton}>
              <Link className={styles.editButton} to="/editProfile">
                Редактировать профиль
              </Link>
            </div>
            <div className={styles.descriptionEditSettings}>
              <Link to="/editProfile">
                <svg
                  ariaLabel="Параметры"
                  className="_8-yf5 "
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    fill="none"
                    r="8.635"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></circle>
                  <path
                    d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className={styles.descriptionPosts}>
            <div className={styles.followsWrap}>
              <b>{posts.length}</b> публикаций
            </div>
            <div onClick={handleGetFollows} className={styles.followsWrap}>
              <b>{user?.freinds?.length}</b> подписчиков
            </div>

            <div  onClick={handleGetSubscription}  className={styles.followsWrap}>
              <b>{user?.follows?.length}</b> подписок

            </div>
            {follows && (
              <div className={styles.followComponentWrap}>

                <Followers user={user} setFollows={setFollows} />
              </div>
            )}
            {subscription && (
              <div  className={styles.subscriptionComponentWrap}>

                <Subscribers user={user} setSubscription={setSubscription} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.menuMain}>
          <Link className={styles.menuLink} to="/">
            <svg
              ariaLabel=""
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
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="18"
                x="3"
                y="3"
              ></rect>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="9.015"
                x2="9.015"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="14.985"
                x2="14.985"
                y1="3"
                y2="21"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="9.015"
                y2="9.015"
              ></line>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="21"
                x2="3"
                y1="14.985"
                y2="14.985"
              ></line>
            </svg>
            <div className={styles.menuText}>ПУБЛИКАЦИИ</div>
          </Link>
        </div>
        <div className={styles.menuMain}>
          <Link className={styles.menuLink} to="/saves">
            <svg
              ariaLabel=""
              className="_8-yf5 "
              color="#8e8e8e"
              fill="#8e8e8e"
              height="12"
              role="img"
              viewBox="0 0 24 24"
              width="12"
            >
              <polygon
                fill="none"
                points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polygon>
            </svg>
            <Link to="/saves">
              <div className={styles.menuText}>СОХРАНЕННОЕ</div>
            </Link>
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeaderForUser;
