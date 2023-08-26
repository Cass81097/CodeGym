import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shortid from 'shortid';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// Configure Firebase.
const config = {
    apiKey: 'AIzaSyBtDl7d-eCFuCMdEHampH6lSNaRRjLc1pE',
    authDomain: 'music-app-86a04.firebaseapp.com',
};
firebase.initializeApp(config);

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

export default function Login() {
    // Login with Usn/Pw

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
    const [loadingAPI, setLoadingAPI] = useState(false)

    let checkUsernamePassword = username && password ? "active1" : "my-btn"
    let checkUsernamePasswordButton = username && password ? false : true

    const handleLogin = async () => {
        if (!username && !password) {
            notify()
            return;
        }
        setLoadingAPI(true);

        const data = {
            username: username,
            password: password
        };

        let res = await axios.post(`http://localhost:3000/login`, data);
        let token = res.data
        console.log(token);

        if (token === "User is not exist" || token === "Password is wrong") {
            notify();
        } else {
            localStorage.setItem("token", token);
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.idUser;
            console.log("User ID:", userId);
            localStorage.setItem("userId", userId);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
            navigate("/home")
        }
        setTimeout(() => {
            setLoadingAPI(false);
        }, 3000);
    }

    // Login with Email
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
            if (user) {
                handleGetToken(user);
            }
        });
        return () => unregisterAuthObserver();
    }, []);

    const handleGetToken = async user => {
        try {
            const email = user.email;
            const existingUser = await checkIfUserExists(email);

            if (existingUser) {
                const { username } = existingUser;
                const loginData = { username, password: username };
                const resLogin = await axios.post('http://localhost:3000/login', loginData);
                const token = resLogin.data;
                localStorage.setItem('token', token);
                const decodedToken = jwt_decode(token);
                const userId = decodedToken.idUser;
                localStorage.setItem('userId', userId);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                redirectToHome();
            } else {
                const hashedToken = shortid.generate();
                const data = {
                    username: hashedToken,
                    password: hashedToken,
                    imgUrl: '../assets/images/avatar-default.jpg',
                    email,
                };

                const res = await axios.post('http://localhost:3000/register', data);
                console.log('Registration response:', res.data);

                const resLogin = await axios.post('http://localhost:3000/login', data);
                const token = resLogin.data;
                localStorage.setItem('token', token);
                const decodedToken = jwt_decode(token);
                const userId = decodedToken.idUser;
                console.log('User ID:', userId);
                localStorage.setItem('userId', userId);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                redirectToHome();
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const checkIfUserExists = async email => {
        try {
            const res = await axios.get(`http://localhost:3000/?email=${email}`);
            const user = res.data[0];
            return user;
        } catch (error) {
            console.error('Error checking user existence:', error);
            return null;
        }
    };

    const redirectToHome = () => {
        navigate('/home');
    };


    if (!isSignedIn) {
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
                            >
                                {loadingAPI && <i className="fas fa-sync fa-spin"></i>}
                                &nbsp;Login</button>
                            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
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

}