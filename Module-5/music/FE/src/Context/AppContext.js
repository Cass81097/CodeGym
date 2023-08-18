import axios from "axios";
import { useEffect, useState, createContext } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {

    const [listAlbum, setListAlbum] = useState([]);
    const [listMusic, setListMusic] = useState([]);
    const [listPlay, setListPlay] = useState([]);
    const [isUser, setIsUser] = useState([]);

    useEffect(() => {
        fetchAlbumList();
        fetchSongList();
        fetchPlayList();
        fetchIsUser();
    }, []);

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

    const fetchPlayList = async (localId) => {
        try {
            const res = await axios.get(`http://localhost:3000/playlists/?userId=2`);
            setListPlay(res.data);
        } catch (error) {
            console.error("Error fetching Song list:", error);
        }
    };

    const fetchIsUser = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:3000/?id=2`);
            setIsUser(res.data);
        } catch (error) {
            console.error("Error fetching Song list:", error);
        }
    };

    return (
        <AppContext.Provider value={{ listAlbum, listMusic, listPlay, isUser }}>
            {children}
        </AppContext.Provider>
    );
};