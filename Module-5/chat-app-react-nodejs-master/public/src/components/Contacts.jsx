import React, { useState, useEffect } from "react";
import moment from 'moment';
import { getLastMessage } from "../utils/APIRoutes"
import axios from "axios";

export default function Contacts({ contacts, changeChat, lastMessage, socket }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [currentLastmessage, setCurrentLastmessage] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      let senderId = data._id
      const dataMessage = await axios.get(
        `${getLastMessage}/${senderId}`
      )
      setCurrentLastmessage(dataMessage.data)
    };

    fetchData();
  }, [lastMessage]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };

    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const convertUTCToVietnamTime = (utcTime, index) => {
    const message = currentLastmessage[index];
    const vietnamTime = message ? moment.utc(message.createdAt).local().format('HH:mm') : '';
    return vietnamTime;
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <div className="leftSide">
          <div className="header">
            <div className="userimg">
              <img className="cover" src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
              <p className="current_name">{currentUserName}</p>
            </div>
            <ul className="nav_icons">
              <li><i className="fas fa-comment-alt"></i></li>
              <li><i className="fas fa-ellipsis-v"></i></li>
            </ul>
          </div>

          <div className="search_chat">
            <div>
              <input type="text" placeholder="Search or start new chat..." />
              <i className="fas fa-search"></i>
            </div>
          </div>

          <div className="chatlist">
            {contacts.map((contact, index) => {
              const isCurrentChat = contacts[index]._id === lastMessage.receiverId;
              const currentMessage = isCurrentChat ? lastMessage.message : currentLastmessage[index] && currentLastmessage[index].message;
              // const vietnamTime = lastMessage && lastMessage[index] ? convertUTCToVietnamTime(lastMessage[index].createdAt) : "";
              const vietnamTime = convertUTCToVietnamTime(lastMessage.createdAt, index);
              return (
                <div
                  key={contact._id}
                  className={`block ${index === currentSelected ? "active" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                  id={contacts[index]._id}
                >
                  <div className="imgbx">
                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" className="cover" />
                  </div>
                  <div className="details">
                    <div className="listHead">
                      <h4>{contact.username}</h4>
                      <p className="time">{vietnamTime}</p>
                    </div>
                    <div className="message_p">
                      <p>{currentMessage}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}