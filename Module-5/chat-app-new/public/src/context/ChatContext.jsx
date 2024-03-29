import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import { io } from "socket.io-client"

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUser] = useState([])
    const [notifications, setNotifications] = useState([])
    const [allUsers, setAllUsers] = useState([])

    // Socket
    useEffect(() => {

        const newSocket = io("http://localhost:3000")
        setSocket(newSocket)

        return () => {
            newSocket.disconnect();
        }
    }, [user])

    // Add online user

    useEffect(() => {

        if (socket === null) return;
        socket.emit("addNewUser", user?._id)
        socket.on("getOnlineUsers", (res) => {
            setOnlineUser(res)
        })

        return () => {
            socket.off("getOnlineUsers");
        };
    }, [socket])

    // Send message
    useEffect(() => {

        if (socket === null) return;

        const recipientId = currentChat?.members?.find((id) => id !== user?._id);

        socket.emit("sendMessage", { ...newMessage, recipientId })

    }, [newMessage])

    // Receive message and noti
    useEffect(() => {
        if (socket === null) return;

        socket.on("getMessage", (res) => {
            // console.log("res", res);
            // console.log("currentChat?._id", currentChat?._id);
            // console.log("res.chatId", res.chatId);
            if (currentChat?._id !== res.chatId) return;
            setMessages((prev) => [...prev, res]);
        });

        socket.on("getNotification", (res) => {
            const isChatOpen = currentChat?.members.some(id => id == res.senderId)

            if (isChatOpen) {
                setNotifications(prev => [{ ...res, isRead: true }, ...prev])
            } else {
                setNotifications(prev => [res, ...prev])
            }
        })

        return () => {
            socket.off("getOnlineUsers");
            socket.off("getNotification")
        };

    }, [socket, currentChat])


    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`)
            if (response.error) {
                return console.log("Error fetching users", response)
            }

            const pChats = response.filter((u) => {
                let isChatCreated = false;
                if (user?._id === u._id) return false

                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }
                return !isChatCreated;
            });
            setPotentialChats(pChats);
            setAllUsers(response)
        }
        getUsers()
    }, [userChats])

    useEffect(() => {

        const getUserChats = async () => {
            if (user?._id) {

                setIsUserChatsLoading(true)
                setUserChatsError(null)

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`)
                setIsUserChatsLoading(false)

                if (response.error) {
                    return setUserChatsError(response);
                }

                setUserChats(response)
            }
        };

        getUserChats();
    }, [user, notifications])

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage) return console.log("You must type something...");

        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }))

        if (response.error) {
            return setSendTextMessageError(response)
        }

        setNewMessage(response);
        setMessages((prev) => [...prev, response])
        setTextMessage("")
    }, [])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, [])

    useEffect(() => {

        const getMessages = async () => {

            setIsMessagesLoading(true)
            setMessagesError(null)

            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`)

            setIsMessagesLoading(false)

            if (response.error) {
                return setMessagesError(response);
            }

            setMessages(response)
        };

        getMessages();
    }, [currentChat])

    const createChat = useCallback(async (firstId, secondId) => {
        let data = {
            firstId,
            secondId,
        }

        const response = await postRequest(
            `${baseUrl}/chats/create/${data.firstId}/${data.secondId}`
        )

        if (response.error) {
            return console.log("Error creating chat", response)
        }

        setUserChats((prev) => [...prev, response])
    }, [])


    const markAllNotificationsAsRead = useCallback((notificationList) => {
        const mNotifications = notificationList.map((n) => {
            return { ...n, isRead: true };
        });

        setNotifications(mNotifications);
    }, []);

    const markNotificationsAsRead = useCallback((n, userChats, user, notifications) => {
        console.log(n, userChats, user, notifications);

        const desiredChat = userChats.find(chat => {
            const chatMembers = [user._id, n.senderId];
            const isDesiredChat = chat?.members.every((member) => {
                return chatMembers.includes(member);
            });
            return isDesiredChat;
        })

        const mNotifications = notifications.map(el => {
            if (n?.secondId == el?.senderId) {
                return { ...n, isRead: true }

            } else {
                return el;
            }
        })


        updateCurrentChat(desiredChat);
        setNotifications(mNotifications);
    }, [])

    const markThisUserNotificationsAsRead = useCallback((thisUserNotifications, notifications) => {
        const updatedNotifications = notifications.map((notification) => {
            const isNotificationRead = thisUserNotifications.some(
                (userNotification) => userNotification.senderId === notification.senderId
            );
            return isNotificationRead ? { ...notification, isRead: true } : notification;
        });
        setNotifications(updatedNotifications);
    }, []);

    return <ChatContext.Provider
        value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
            createChat,
            updateCurrentChat,
            messages,
            isMessagesLoading,
            messagesError,
            currentChat,
            sendTextMessage,
            onlineUsers,
            notifications,
            allUsers,
            markAllNotificationsAsRead,
            markNotificationsAsRead,
            markThisUserNotificationsAsRead,
        }}
    >
        {children}
    </ChatContext.Provider>

}