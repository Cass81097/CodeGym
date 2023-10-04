import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CustomNavbar from "./components/CustomNavbar";
import { AuthContext } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SetAvatar from "./components/SetAvatar";

export default function App() {
  const { user } = useContext(AuthContext)
  // console.log("ChatContextProvider", user);

  return (
    <>
      <ChatContextProvider user={user}>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Login />} />
          <Route path="/register" element={user ? <Chat /> : <Register />} />
          <Route path="/login" element={user ? <Chat /> : <Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ChatContextProvider>
    </>
  );
}
