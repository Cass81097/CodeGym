import axios from "axios";
import { useEffect, useState, createContext } from "react";

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    const userId = localStorage.getItem("userId");
    const [listAlbum, setListAlbum] = useState([]);
    const [listMusic, setListMusic] = useState([]);
    const [listPlay, setListPlay] = useState([]);
    const [isUser, setIsUser] = useState([]);

    useEffect(() => {
        fetchAlbumList();
        fetchSongList();
        fetchPlayList(userId); 
        fetchIsUser(userId); 
    }, [userId]);

    const fetchAlbumList = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/albums`);
            setListAlbum(res.data);
        } catch (error) {
            console.error("Error fetching Album list:", error);
        }
    };

    const fetchSongList = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/songs/id`);
            setListMusic(res.data);
        } catch (error) {
            console.error("Error fetching Song list:", error);
        }
    };

    const fetchPlayList = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:3000/playlists/?userId=${userId}`);
            setListPlay(res.data);
        } catch (error) {
            console.error("Error fetching Playlist:", error);
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

    return (
        <HomeContext.Provider value={{ listAlbum, listMusic, listPlay, isUser, fetchPlayList }}>
            {children}
        </HomeContext.Provider>
    );
};