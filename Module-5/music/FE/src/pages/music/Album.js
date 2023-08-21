import '../my-style/album/playlist.css'
import '../my-style/album/styles.css'

import Playbar from '../../components/Playbar';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { setupListenMusic } from "../myjs/Music";
import { AlbumContext } from "../../Context/AlbumContext";
import axios from "axios";

export default function Album() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    const { isAlbum, isUser, albumInfo } = useContext(AlbumContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("albumId", id);
    }, [id]);

    useEffect(() => {
        setupListenMusic();
    }, []);

    const goHomePage = () => {
        navigate('/home')
        // localStorage.removeItem("albumId");
    }

    return (
        <>
            <div className="album">
                <header>
                    <div className="menu_side_album">
                        <h1>Album</h1>
                        <div className="playlist-album">
                            <h4 onClick={() => goHomePage()} id="home" className="active-album"><span></span><i className="bi bi-music-note-beamed"></i> Trang chủ</h4>
                            <h4 className="active-album"><span></span><i className="bi bi-music-note-beamed"></i> Album</h4>
                        </div>
                    </div>

                    <div className="song_side_album">
                        <nav>
                            <div className="back-button-album" onClick={() => goHomePage()}>
                                <i className="bi bi-chevron-left"></i>
                            </div>
                            <div id="user" className="user_album">
                                {isUser.map((item, i) => (
                                    <img key={i} src={item.imgUrl} alt=''></img>
                                ))}
                            </div>
                        </nav>
                        <div className="right">
                            <div className="playlist-header">
                                <div className="playlist-content" data-toggle="modal" data-target="#exampleModal">
                                    <div id="playlist-cover" className="playlist-cover">
                                        <img src={albumInfo.imgUrl} alt=''></img>
                                    </div>
                                    <div id="playlist-info" className="playlist-info">
                                        <div className="playlist-public">Album</div>
                                        <div className="playlist-title">{albumInfo.name}</div>
                                        <div style={{ height: '10px' }}></div>
                                        <div className="playlist-stats">
                                            <img src="../assets/images/spotify-logo.png" width="24px" height="24px" alt=""></img>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="playlist-songs-container" style={{padding: "20px 20px 20px 20px"}}>
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

                    <Playbar></Playbar>   
                </header>
            </div>

        </>
    )
}
