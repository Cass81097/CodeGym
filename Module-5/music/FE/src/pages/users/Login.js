import { useState, useEffect } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import jwt_decode from "jwt-decode";

export default function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/home");
        }
    }, [navigate]);

    const notify = () => toast("Sai tên đăng nhập hoặc mật khẩu!");
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

    let checkUsernamePassword = username && password ? "active1" : "my-btn"
    let checkUsernamePasswordButton = username && password ? false : true

    const handleLogin = async () => {
        if (!username && !password) {
            notify()
            return;
        }

        const data = {
            username: username,
            password: password
        };

        try {
            let res = await axios.post(`http://localhost:3000/login`, data);
            let token = res.data
            console.log(token);

            if (token === "User is not exist" || token === "Password is wrong") {
                notify()
                return;
            } else {
                localStorage.setItem("token", token);
                const decodedToken = jwt_decode(token);
                const userId = decodedToken.idUser;
                console.log("User ID:", userId);
                localStorage.setItem("userId", userId);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                navigate("/home")
            }

        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    return (
        <>
            <div className="login">
                <div className="container">
                    <div className="login-container col-12 col-sm-4">
                        <div className="title">Login</div>
                        <div className="text">Username :</div>
                        <input
                            type="text"
                            placeholder="Username.."
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                        <div className="input-2">
                            <div className="text">Password :</div>
                            <input
                                type={isShowPassword === true ? "text" : "password"}
                                placeholder="Password..."
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <i className={isShowPassword === true ? "fas fa-eye" : "fas fa-eye-slash"}
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            ></i>
                        </div>
                        <button
                            className={checkUsernamePassword}
                            disabled={checkUsernamePasswordButton}
                            onClick={() => handleLogin()}
                        >Login</button>
                        <div className="back">
                            <i className="fas fa-angle-double-left"></i><span> Go back</span>
                        </div>
                    </div>
                </div>
            </div>


            <ToastContainer />
        </>
    )
}