import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import moment from 'moment';
import { useNavigate } from "react-router-dom";
import { getLastMessageByUserIds } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket, setlastMessage }) {
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [isLastMessage, setIsLastMessage] = useState(null);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    let senderId = data._id
    if (isLastMessage) {
      const dataMessage = await axios.get(
        `${getLastMessageByUserIds}?senderId=${senderId}&receiverId=${currentChat._id}`
      )
      setlastMessage(dataMessage.data)
    }
  }, [isLastMessage, setIsLastMessage]);

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    });

    setMessages(response.data);

    if (response.data.length > 0) {
      const chatTime = response.data[response.data.length - 1].createdAt;
      // console.log("Thời gian chat:", chatTime);
      const vietnamTime = convertUTCToVietnamTime(chatTime);
      localStorage.setItem('vietnamTime', vietnamTime);
    } else {
      localStorage.removeItem('vietnamTime');
    }
  }, [currentChat]);

  const convertUTCToVietnamTime = (utcTime) => {
    const vietnamTime = moment.utc(utcTime).local().format('HH:mm');
    return vietnamTime;
  };

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
    // console.log('ok');
    setIsLastMessage(Date.now());
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
        // alert('ok')
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    setIsLastMessage(Date.now());
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" }); 
  }, [messages]);

  return (
    <div className="rightSide">
      <div className="header">
        <div className="imgText">
          <div className="userimg">
            <img className="cover" src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
          </div>
          <h4>{currentChat.username}<br></br><span>online</span></h4>
        </div>
        <ul className="nav_icons">
          <Logout />
        </ul>
      </div>

      <div className="chatBox">
        {messages.map((message) => {
          const vietnamTime = convertUTCToVietnamTime(message.createdAt);
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "my_message" : "frnd_message"
                  }`}
              >
                <p>{message.message}<br></br><span>{vietnamTime}</span></p>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg}  />
    </div>

  );
}

