import axios from "axios";
import { useEffect, useState, createContext } from "react";

export const AlbumContext = createContext({});

export const AlbumProvider = ({ children }) => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    const userId = localStorage.getItem("userId");
    const id = localStorage.getItem("albumId");
    const [isAlbum, setIsAlbum] = useState([]);
    const [isUser, setIsUser] = useState([]);
    const [albumInfo, setAlbumInfo] = useState([]);

    useEffect(() => {
        fetchIsAlbum(id);
        showAlbumInfo(id);
        fetchIsUser(userId);
    }, [id, userId]);

    const fetchIsAlbum = async (albumId) => {
        try {
            const res = await axios.get(`http://localhost:3000/songs/id/?idAlbum=${albumId}`);
            setIsAlbum(res.data);
        } catch (error) {
            console.error("Error fetching Song list:", error);
        }
    };

    const showAlbumInfo = async (albumId) => {
        try {
            const res = await axios.get(`http://localhost:3000/albums/?id=${albumId}`);
            setAlbumInfo(res.data);
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

    return (
        <AlbumContext.Provider value={{ isAlbum, isUser, albumInfo }}>
            {children}
        </AlbumContext.Provider>
    );
};