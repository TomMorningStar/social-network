import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/features/application";
import AddPosts from "./addPosts/AddPosts";
import ExitUser from "./exitPage/ExitUser";
import styles from "./Header.module.css";
import Logo from "../Images/user.png";
import RibbonPage from "./homePage/RibbonPage";
import LogoHomePage from "./logoPage/LogoHomePage";
import MessagePage from "./messagePage/MessagePage";
import NotificationsPage from "./notifications/NotificationsPage";
import UserPage from "./userPage/UserPage";
import { Link } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState("");
  const [window, setWindow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.application);
  const usersList = users?.filter((userOne) => {
    if (userOne.login.toLowerCase().includes(user.toLowerCase())) {
      return user;
    }
  });

  const path = "http://localhost:4000/";

  const handleOpenWindow = (e) => {
    if (!user && window) {
      setWindow(false);
    } else {
      setWindow(true);
    }
  };

  const handleCloseWindow = () => {
    setWindow(false);
  };

  return (
    <header>
      <div className={styles.headerWrapper}>
        <LogoHomePage />

        <div className={styles.inpWrapper}>
          <input
            placeholder="Поиск"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onClick={(e) => handleOpenWindow(e)}
          />

          {window && (
            <div
              style={
                usersList.length > 5
                  ? {
                      position: "absolute",
                      backgroundColor: "#fafafa",
                      overflowY: "scroll",
                      height: 300,
                    }
                  : {
                      width: "250px",
                      position: "absolute",
                      backgroundColor: "#fafafa",
                    }
              }
            >
              {usersList.map((user) => {
                return (
                  <div className={styles.userWrapper}>
                    <div className={styles.logoUser}>
                      <img
                        style={{ borderRadius: 100 }}
                        width={30}
                        height={30}
                        src={user?.avatar ? path + user.avatar : Logo}
                        alt="лого юзера"
                      />
                    </div>
                    <Link
                      to={`/one/user/${user._id}`}
                      className={styles.nickNameUser}
                      onClick={handleCloseWindow}
                    >
                      {user?.login}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className={styles.iconsWrapper}>
          <AddPosts />
          <RibbonPage />
          <MessagePage />
          {/* <NotificationsPage /> */}
          <ExitUser />
          <UserPage />
        </div>
      </div>
    </header>
  );
};

export default Header;
