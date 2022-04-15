import React, { useEffect, useState } from "react";
import styles from "./Saved.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getSaves } from "../../redux/features/saves";
import { useParams } from "react-router-dom";

const Saved = () => {
  const [userSaves, setUserSaves]= useState()
  const dispatch = useDispatch();
  const user = useSelector((state)=> state.application.id)
  useEffect(() => {
    dispatch(getSaves());
  }, [dispatch]);
  const savePosts = useSelector((state) => state.saves.saves);
    console.log(savePosts)

  return (
    <div className={styles.main}>
      {savePosts?.map((post) => {
        return (
          <div className={styles.mainPosts}>
            <div className={styles.mainPostsImg}>
              <img src={`http://localhost:4000/${post.imagePost}`} alt="postImage" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Saved;
