// import axios from 'axios';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import jwt_decode from 'jwt-decode';
// import React, { useEffect, useState } from 'react';
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { useNavigate } from 'react-router-dom';
// import shortid from 'shortid';

// // Configure Firebase.
// const config = {
//     apiKey: 'AIzaSyBtDl7d-eCFuCMdEHampH6lSNaRRjLc1pE',
//     authDomain: 'music-app-86a04.firebaseapp.com',
// };
// firebase.initializeApp(config);

// const uiConfig = {
//     signInFlow: 'popup',
//     signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
//     callbacks: {
//         // Avoid redirects after sign-in.
//         signInSuccessWithAuthResult: () => false,
//     },
// };

// function SignIn() {
//     const [isSignedIn, setIsSignedIn] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
//             setIsSignedIn(!!user);
//             if (user) {
//                 handleGetToken(user);
//             }
//         });
//         return () => unregisterAuthObserver();
//     }, []);

//     const handleSignOut = () => {
//         firebase.auth().signOut();
//         localStorage.clear();
//     };

//     const handleGetToken = async user => {
//         try {
//             const email = user.email;
//             const existingUser = await checkIfUserExists(email);

//             if (existingUser) {
//                 const { username } = existingUser;
//                 const loginData = { username, password: username };
//                 const resLogin = await axios.post('http://localhost:3000/login', loginData);
//                 const token = resLogin.data;
//                 localStorage.setItem('token', token);
//                 const decodedToken = jwt_decode(token);
//                 const userId = decodedToken.idUser;
//                 localStorage.setItem('userId', userId);
//                 axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
//                 redirectToHome();
//             } else {
//                 const hashedToken = shortid.generate();
//                 const data = {
//                     username: hashedToken,
//                     password: hashedToken,
//                     email,
//                 };

//                 const res = await axios.post('http://localhost:3000/register', data);
//                 console.log('Registration response:', res.data);

//                 const resLogin = await axios.post('http://localhost:3000/login', data);
//                 const token = resLogin.data;
//                 localStorage.setItem('token', token);
//                 const decodedToken = jwt_decode(token);
//                 const userId = decodedToken.idUser;
//                 console.log('User ID:', userId);
//                 localStorage.setItem('userId', userId);
//                 axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
//                 redirectToHome();
//             }
//         } catch (error) {
//             console.error('Error during registration:', error);
//         }
//     };

//     const checkIfUserExists = async email => {
//         try {
//             const res = await axios.get(`http://localhost:3000/?email=${email}`);
//             const user = res.data[0];
//             return user;
//         } catch (error) {
//             console.error('Error checking user existence:', error);
//             return null;
//         }
//     };

//     const redirectToHome = () => {
//         navigate('/home');
//     };

//     if (!isSignedIn) {
//         retu rn (
//             <div>
//                 <h1>My App</h1>
//                 <p>Please sign-in:</p>
//                 <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
//             </div>
//         );
//     }
//     return (
//         <div>
//             <h1>My App</h1>
//             <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
//             <button onClick={handleSignOut}>Sign-out</button>
//         </div>
//     );
// }

// export default SignIn;