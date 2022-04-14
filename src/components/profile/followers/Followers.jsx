import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOne } from '../../../redux/features/application';
import style from './Followers.module.css';
import logo from "../../Images/user.png";


const Followers = ( {setFollows , user }) => {
    const dispatch = useDispatch()

  

    const user1 = useSelector((state)=> state.application.searchUser)

    const handleCloseWindow = () => {
        setFollows(false)
    }
    

    
    return (
        <div className={style.mainFollower}>
            <div className={style.header}>
                <div className={style.followers}>
                    <div className={style.follow}>Подписчики</div>
                    <div className={style.followCount}>{user?.freinds?.length}</div>
                </div>
                <div onClick={handleCloseWindow} className={style.closeButton}>
                  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="cancel_24__Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="cancel_24__cancel_24"><path id="cancel_24__Bounds" d="M0 0h24v24H0z"></path><path d="M18.3 5.7a.99.99 0 00-1.4 0L12 10.6 7.1 5.7a.99.99 0 00-1.4 1.4l4.9 4.9-4.9 4.9a.99.99 0 001.4 1.4l4.9-4.9 4.9 4.9a.99.99 0 001.4-1.4L13.4 12l4.9-4.9a.99.99 0 000-1.4z" id="cancel_24__Mask" fill="currentColor"></path></g></g></svg>
                </div>
            </div>
            <div className={style.mainSearch}>
                <div className={style.searchSvg}></div>
                <input className={style.search} type="search" autoComplete='on' placeholder='Поиск по страницам'/>
            </div>
            <div className={style.mainUsers}>
                {user?user?.freinds?.map((item)=>{
                    return(
                        <div className={style.user}>
                            {console.log(item)}
                            <div className={style.userImg}><img src={item.avatar?`http://localhost:4000/${item.avatar}`:logo} alt='userImg'/></div>
                            <div className={style.userDescription}>
                                <div className={style.userName}>{item.login}</div>
                                <div className={style.description}>{item.firstname}</div>
                                <button className={style.subscribeButton}>Подписаться</button>
                            </div>
                        </div>
                    )
                })
            :
            user1?.freinds?.map((item)=>{
                return(
                    <div className={style.user}>
                        {console.log(item)}
                        <div className={style.userImg}><img src={item.avatar?`http://localhost:4000/${item.avatar}`:logo} alt='userImg'/></div>
                        <div className={style.userDescription}>
                            <div className={style.userName}>{item.login}</div>
                            <div className={style.description}>{item.firstname}</div>
                            <button className={style.subscribeButton}>Подписаться</button>
                        </div>
                    </div>
                )
            })
            }
            </div>
        </div>
    );
};

export default Followers;