import axios from "axios";
import { Buffer } from "buffer-es6";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { baseUrl } from "../utils/services";
export default function SetAvatar() {

  const api = `https://api.multiavatar.com/4645646`;
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("User")) {
      navigate("/login");
    }
  }, [navigate]);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem("User")
      );

      const { data } = await axios.post(`${baseUrl}/users/setAvatar/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          "User",
          JSON.stringify(user)
        );
        window.location.href = "/";
      } else {
        toast.error("Error setting avatar. Please try again.", toastOptions);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = Buffer.from(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          {/* <img src={loader} alt="loader" className="loader" /> */}
          <div className="center">
            <div className="ring"></div>
            <span>loading...</span>
          </div>
        </Container>
      ) : (
        <Container>
          <div className="title-container">   
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div style={{cursor:"pointer"}}
                  className={`avatar ${selectedAvatar === index ? "selected" : ""
                    }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background: #282828;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }

  .center{
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .ring{
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    animation: ring 2s linear infinite;
  }
  @keyframes ring {
    0%{
      transform: rotate(0deg);
      box-shadow: 1px 5px 2px #e65c00;
    }
    50%{
      transform: rotate(180deg);
      box-shadow: 1px 5px 2px #18b201;
    }
    100%{
      transform: rotate(360deg);
      box-shadow: 1px 5px 2px #0456c8;
    }
  }
  .ring:before{
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(255,255,255,.3);
  }
  span{
    color: #737373;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 200px;
    animation: text 3s ease-in-out infinite;
  }
  @keyframes text {
    50%{
      color: black;
    }
  }
`;
