import '../my-style/album/playlist.css'
import '../my-style/album/styles.css'
import '../my-style/album/upload.css'

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { setupListenMusic } from "../myjs/Music";
import axios from "axios";

export default function Album() {
    const { id } = useParams();
    const [isAlbum, setIsAlbum] = useState([]);

    useEffect(() => {
        fetchIsAlbum(id);
    }, [id]);

    useEffect(() => {
        setupListenMusic();
    }, []);

    const fetchIsAlbum = async (albumId) => {
        try {
            const res = await axios.get(`http://localhost:3000/songs/id/?idAlbum=${albumId}`);
            setIsAlbum(res.data);
        } catch (error) {
            console.error("Error fetching Song list:", error);
        }
    };

    return (
        <>
            <div className="album">
                <header>
                    <div className="menu_side_album">
                        <h1>Album</h1>

                        <div className="playlist-album">
                            <h4 id="home" className="active-album"><span></span><i className="bi bi-music-note-beamed"></i> Trang chủ</h4>
                            <h4 className="active-album"><span></span><i className="bi bi-music-note-beamed"></i> Album</h4>
                        </div>
                    </div>

                    <div className="song_side_album">
                        <nav>
                            <div className="back-button-album">
                                <i className="bi bi-chevron-left"></i>
                            </div>
                            <div id="user" className="user-album">

                            </div>
                        </nav>
                        <div className="right">
                            <div className="playlist-header">
                                <div className="playlist-content" data-toggle="modal" data-target="#exampleModal">
                                    <div id="playlist-cover" className="playlist-cover">
                                        
                                    </div>
                                    <div id="playlist-info" className="playlist-info">

                                    </div>
                                </div>

                            </div>
                            <div className="playlist-songs-container">
                                <div className="playlist-buttons">
                                    <div className="playlist-buttons-left">
                                        <div className="playlist-buttons-resume-pause">
                                            <img id="btn-image" src="../assets/images/play.png" width="40px" height="40px" alt=""></img>
                                        </div>
                                        <div className="playlist-buttons-like">
                                            <img src="../assets/images/FiiledLike.svg" alt="" className="spotify-color"></img>
                                        </div>
                                        <div className="playlist-buttons-download">
                                            <img src="../assets/images/Download.svg" alt=""></img>
                                        </div>
                                        <div className="playlist-buttons-three-dot">
                                            <img src="../assets/images/ThreeDots.svg" alt=""></img>
                                        </div>
                                    </div>
                                </div>
                                <div className="playlist-songs menu_song">
                                    <table id="songItem">
                                        <thead className='table-song-album'>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên bài hát</th>
                                                <th>Album</th>
                                                <th>Ngày thêm</th>
                                                <th>
                                                    {/* <img src="../assets/images/Duration.svg" alt=""> */}
                                                </th>
                                            </tr>
                                        </thead>

                                        {isAlbum.map((item, i) => (
                                            <tbody key={i}>
                                                <tr className="songItem">
                                                    <td>{i + 1}</td>
                                                    <td className="song-title">
                                                        <div className="song-image">
                                                            <img src={item.imageUrl} alt=""></img>
                                                        </div>
                                                        <h5 className="song-name-album">
                                                            <div className="song-name">{item.name}</div>
                                                            <div className="subtitle">{item.singer}</div>
                                                        </h5>
                                                    </td>
                                                    <td className="song-album">{item.album.name}</td>
                                                    <td className="song-date-added">May 31, 2022</td>
                                                    <td className="song">
                                                        <i className="bi playListPlay bi-play-circle-fill" id={item.id}></i>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="master_play">
                        <div className="wave">
                            <div className="wave1"></div>
                            <div className="wave1"></div>
                            <div className="wave1"></div>
                        </div>
                        <img src="../assets/images/7.jpg" id="poster_master_play" alt=""></img>
                        <h5 id="title">Bật Tình Yêu Lên <br></br>
                            <div className="subtitle">Hòa Minzy</div>
                        </h5>
                        <div className="icon">
                            <i className="bi bi-skip-start-fill" id="back"></i>
                            <i className="bi bi-play-fill" id="masterPlay"></i>
                            <i className="bi bi-skip-end-fill" id="next"></i>
                        </div>
                        <span id="currentStart">0:00</span>
                        <div className="bar">
                            <input type="range" id="seek" min="0" value="0" max="100" readOnly ></input>
                            <div className="bar2" id="bar2"></div>
                            <div className="dot"></div>
                        </div>
                        <span id="currentEnd">0:00</span>

                        <div className="vol">
                            <i className="bi bi-volume-down-fill" id="vol_icon"></i>
                            <input type="range" id="vol" min="0" value="0" max="100" readOnly ></input>
                            <div className="vol_bar"></div>
                            <div className="dot" id="vol_dot"></div>
                        </div>
                    </div>
                </header>
            </div>

        </>
    )
}
