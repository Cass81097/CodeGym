import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export default function PotentialChats() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext)
    const { potentialChats, createChat, onlineUsers } = useContext(ChatContext)
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

    return (
        <>
            <div className="potential-container">   
                <div className="all-users">
                    {potentialChats && potentialChats.map((u, index) => {
                        const isOnline = onlineUsers?.some((user) => user?.userId === u?._id)
                        return (
                            <div className="single-users" key={index} onClick={() => createChat(user._id, u._id)}>
                                {capitalizeFirstLetter(u?.username)}
                                <span
                                    className={isOnline ? "user-online" : ""}></span>
                            </div>
                        )
                    })}
                </div>
                <div className="my-avatar">
                    <img src={
                        user?.avatarImage
                            ? `data:image/svg+xml;base64,${user?.avatarImage}`
                            : "https://haycafe.vn/wp-content/uploads/2022/02/Avatar-trang-800x505.jpg"
                    } style={{cursor:"pointer", borderRadius:"50%"}} alt="" width="45px" height="40px" onClick={() => navigate('/setAvatar')}/>
                </div>
            </div>

        </>

    );
}


