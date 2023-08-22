import { Outlet, Route, Routes } from "react-router-dom";
import './App.css';
import { AlbumProvider } from './Context/AlbumContext';
import { HomeProvider } from './Context/HomeContext';
import { PlaylistProvider } from './Context/PlaylistContext';
import Home from "./pages/Home";
import Album from "./pages/music/Album";
import Playlist from './pages/music/Playlist';
import Login from './pages/users/Login';
import SignIn from './pages/users/SignIn';

function App() {

    return (
        <>
            <Outlet />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route
                    path="/home"
                    element={
                        <HomeProvider>
                            <Home />
                        </HomeProvider>
                    }
                />
                <Route
                    path="/album/:id"
                    element={
                        <AlbumProvider>
                            <Album />
                        </AlbumProvider>
                    }
                />
                <Route
                    path="/playlist/:id"
                    element={
                        <PlaylistProvider>
                            <Playlist />
                        </PlaylistProvider>
                    }
                />
            </Routes>
        </>
    );
}

export default App;