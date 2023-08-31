import React, { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import ChatBox from "../components/ChatBox";
import PotentialChats from "../components/PotentialChats";
import UserChat from "../components/UserChat";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function Chat() {

  const { user } = useContext(AuthContext)

  const { userChats, updateCurrentChat } = useContext(ChatContext)
  
  return (
    <Container style={{marginTop:"30px"}}>
      <PotentialChats />
      {userChats?.length < 1 ? null :
        <Stack direction="horizontal" className="aligh-items-start chat-main">
          <Stack className="messages-box flex-grow-0 pe-3" >
            {/* {isUserChatsLoading && <p>Loading chats...</p>} */}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              )
            })}
          </Stack>
          <ChatBox />
        </Stack>
      }
    </Container>
  );
}


