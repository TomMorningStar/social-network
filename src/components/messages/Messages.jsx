import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "./conversation/Conversation";
import styles from "./Messages.module.css";
import Message from "./message/Message";
import { io } from "socket.io-client";

const Messages = () => {
  // подгружение чатов

  const dispatch = useDispatch();
  const [conversations, setConversations] = useState([]);

  const [currentChat, setCurrentChat] = useState(null);

  const [messages, setMessages] = useState();

  const [newMessage, setNewMessage] = useState();

  const socket = useRef();

  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [reciver, setReciver] = useState();

  const user = useSelector((state) => state.application.id);
  const login = useSelector((state)=> state.application.firstname)
  const state = useSelector((state) => state.application.token);

  useEffect(() => {
    socket.current = io("ws://localhost:8900/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.find(
        (user) => user._id.toString() === arrivalMessage.sender
      ) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [currentChat, arrivalMessage]);

  useEffect(() => {
    socket.current.emit("addUser", user);
    socket.current.on("getUsers", (users) => {});
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/conversation/${user}`
        );
        dispatch({ type: "conversation/get/fullfilled", payload: res.data });
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/message/" + currentChat?._id,
          {
            headers: {
              Authorization: `Bearer ${state}`,
              "Content-type": "application/json",
            },
          }
        );
        dispatch({ type: "message/get/fullfilled", payload: res.data });
        setMessages(res.data);
      } catch (err) {
        console.log(err.toString());
      }
    };
    getMessages();
  }, [currentChat, state]);

  // функция создания, и отправки сообщения сообщения
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat._id,
      sender: user,
      text: newMessage,
    };

    const receiverId = currentChat.members.find(
      (member) => member._id.toString() !== user.toString()
    );

    // отправка сообщения на сокет сервер

    socket.current.emit("sendMessage", {
      senderId: user,
      receiverId: receiverId._id.toString(),
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:4000/message", message, {
        headers: {
          Authorization: `Bearer ${state}`,
          "Content-type": "application/json",
        },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleName = (c) => {
    const userID = c.members.find((m) => m._id !== user);
    setReciver(userID);
  };

  const dialog = useRef()
  const scrollChat = ()=>{
          dialog.current.scrollTop = dialog.current.scrollHeight
  }
  
  const handleCurrentChat =  (c) => {
    setCurrentChat(c);
    scrollChat()  
  }

  return (
    <>
      <div className={styles.messages}>
        <div className={styles.yourNicknameWrapper}>
          <span className={styles.yourNickname}>{login}</span>
        </div>

        <div className={styles.chatUserNickname}>
          <span className={styles.yourNickname}>
            <span>{reciver?.firstname}</span>
          </span>
        </div>
      </div>

      <div className={styles.messagesBlock}>
        <div className={styles.chats}>
          {conversations?.map((c) => {
            return (
              <div onClick={() => handleCurrentChat(c)}>
                <span onClick={() => handleName(c)}>
                  <Conversation conversation={c} userId={user} />
                </span>
              </div>
            );
          })}
        </div>
        {currentChat ? (
          <>
            <div ref={dialog} className={styles.dialogues}>
              {messages?.map((m) => {
                return (
                  <Message message={m} convers={conversations} userId={user} />
                );
              })}

              <div className={styles.inpWrapper}>
                <div className={styles.inpBtn}>
                  <input
                    placeholder="Введите сообщение.."
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button onClick={handleSubmit}>Отправить</button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.openDialog}>Нажмите на беседу <br></br>чтобы начать чат</div>
        )}
      </div>
    </>
  );
};

export default Messages;
