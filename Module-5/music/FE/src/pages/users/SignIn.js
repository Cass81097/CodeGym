import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useNavigate } from 'react-router-dom';
import shortid from 'shortid';
import jwt_decode from "jwt-decode";


SignIn.propTypes = {};

// Configure Firebase.
const config = {
    apiKey: 'AIzaSyBtDl7d-eCFuCMdEHampH6lSNaRRjLc1pE',
    authDomain: 'music-app-86a04.firebaseapp.com',
    // ...
};
firebase.initializeApp(config);

const uiConfig = {
    signInFlow: 'redirect',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

function SignIn() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
            console.log(user);
            if (user) {
                handleGetToken(user);
            }
        });
        return () => unregisterAuthObserver();
    }, []);

    const handleSignOut = () => {
        firebase.auth().signOut();
        localStorage.clear();
    };

    const handleGetToken = async (user) => {
        try {
            const email = user.email; // Lấy địa chỉ email từ thông tin người dùng đăng nhập
            const existingUser = await checkIfUserExists(email); // Kiểm tra xem địa chỉ email đã tồn tại hay chưa

            if (existingUser) {
                // Đăng nhập người dùng bằng tài khoản hiện có
                const { username } = existingUser;            
                const loginData = { username, password: username };
                const resLogin = await axios.post('http://localhost:3000/login', loginData);
                let token1 = resLogin.data
                localStorage.setItem("token", token1);
                const decodedToken = jwt_decode(token1);
                const userId = decodedToken.idUser;
                localStorage.setItem("userId", userId);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                // redirectToHome();
               
            } else {
                // Tạo tài khoản mới và cho phép người dùng đăng nhập
                const hashedToken = shortid.generate(); // Tạo mã ngẫu nhiên

                const data = {
                    username: hashedToken,
                    password: hashedToken,
                    email,
                };

                const res = await axios.post('http://localhost:3000/register', data);
                console.log('Registration response:', res.data);

                const resLogin = await axios.post('http://localhost:3000/login', data);
                let token2 = resLogin.data;
                localStorage.setItem("token", token2);
                const decodedToken = jwt_decode(token2);
                const userId = decodedToken.idUser;
                console.log("User ID:", userId);
                localStorage.setItem("userId", userId);
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
                redirectToHome()
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    const checkIfUserExists = async (email) => {
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

    console.log(isSignedIn);

    if (!isSignedIn) {
        return (
            <div>
                <h1>My App</h1>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
            </div>
        );
    }
    return (
        <div>
            <h1>My App</h1>
            <p>
                Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!
            </p>
            <button onClick={handleSignOut}>Sign-out</button>
        </div>
    );
}

export default SignIn;