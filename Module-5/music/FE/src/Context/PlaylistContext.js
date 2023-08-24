import axios from "axios";
import { useEffect, useState, createContext } from "react";

export const PlaylistContext = createContext({});

export const PlaylistProvider = ({ children }) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    const userId = localStorage.getItem("userId");
    const id = localStorage.getItem("playlistId");
    const [songPlaylist, setSongPlaylist] = useState([]);
    const [isUser, setIsUser] = useState([]);
    const [playlistInfo, setPlaylistInfo] = useState([]);
    const [isNotPlaylist, setIsNotPlaylist] = useState([]);

    useEffect(() => {
        fetchSongPlaylist(id);
        showPlaylistInfo(id);
        showNotInPlaylist(id);
        fetchIsUser(userId);
    }, [id, userId]);

    const fetchSongPlaylist = async (playlistId) => {
        try {
            const res = await axios.get(`http://localhost:3000/playlistSongs/id/?idPlaylist=${playlistId}`);
            if (Array.isArray(res.data)) {
                setSongPlaylist(res.data);
            } else {
                console.error("Invalid data format for Song list");
            }
        } catch (error) {
            console.error("Error fetching Song list:", error);
        }
    };

    const showPlaylistInfo = async (playlistId) => {
        try {
            const res = await axios.get(`http://localhost:3000/playlists/?id=${playlistId}`);
            if (Array.isArray(res.data)) {
                setPlaylistInfo(res.data);
            } else {
                console.error("Invalid data format for Song list");
            }
        } catch (error) {
            console.error("Error fetching Album list:", error);
        }
    };

    const fetchIsUser = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:3000/?id=${userId}`);
            setIsUser(res.data);
        } catch (error) {
            console.error("Error fetching User:", error);
        }
    };

    const showNotInPlaylist = async (playlistId) => {
        try {
            const res = await axios.get(`http://localhost:3000/songs/notId/${playlistId}`);
            if (Array.isArray(res.data)) {
                setIsNotPlaylist(res.data);
            } else {
                console.error("Invalid data format for Song list");
            }
        } catch (error) {
            console.error("Error fetching User:", error);
        }
    };

    return (
        <PlaylistContext.Provider value={{ songPlaylist, isUser, playlistInfo, isNotPlaylist }}>
            {children}
        </PlaylistContext.Provider>
    );
};