import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  // return (
  //   <>
  //     {currentUserImage && currentUserImage && (
  //       <Container>
  //         <div class="leftSide"></div>
  //         <div className="brand">
  //           <h3>snappy</h3>
  //         </div>
  //         <div className="contacts">
  //           {contacts.map((contact, index) => {
  //             return (
  // <div
  //   key={contact._id}
  //   className={`contact ${
  //     index === currentSelected ? "selected" : ""
  //   }`}
  //   onClick={() => changeCurrentChat(index, contact)}
  // >
  //                 <div className="avatar">
  //                   <img
  //                     src={`data:image/svg+xml;base64,${contact.avatarImage}`}
  //                     alt=""
  //                   />
  //                 </div>
  //                 <div className="username">
  //                   <h3>{contact.username}</h3>
  //                 </div>
  //               </div>
  //             );
  //           })}
  //         </div>
  //         <div className="current-user">
  //           <div className="avatar">
  //             <img
  //               src={`data:image/svg+xml;base64,${currentUserImage}`}
  //               alt="avatar"
  //             />
  //           </div>
  //           <div className="username">
  //             <h2>{currentUserName}</h2>
  //           </div>
  //         </div>
  //       </Container>
  //     )}
  //   </>
  // );

  return (
    <>
      {currentUserImage && currentUserImage && (
        <div class="leftSide">
          <div class="header">
            <div class="userimg">
              <img class="cover" src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
            </div>
            <ul class="nav_icons">
              <li><i class="fas fa-comment-alt"></i></li>
              <li><i class="fas fa-ellipsis-v"></i></li>
            </ul>
          </div>

          <div class="search_chat">
            <div>
              <input type="text" placeholder="Search or start new chat..." />
              <i class="fas fa-search"></i>
            </div>
          </div>

          <div className="chatlist">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`block ${index === currentSelected ? "active" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div class="imgbx">
                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="" class="cover" />
                  </div>
                  <div class="details">
                    <div class="listHead">
                      <h4>{contact.username}</h4>
                      <p class="time">10:56</p>
                    </div>
                    {/* <div class="message_p">
                            <p>How to make Whatsapp clone using html and css</p>
                        </div> */}
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
