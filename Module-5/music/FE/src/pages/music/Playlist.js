import '../my-style/playlist/styles.css'
import '../my-style/playlist/playlist.css'


import Playbar from '../../components/Playbar';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { setupListenMusic } from "../myjs/Music";
import { PlaylistContext } from "../../Context/PlaylistContext";
import axios from "axios";

export default function Album() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    const { songPlaylist, isUser, playlistInfo, isNotPlaylist } = useContext(PlaylistContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("playlistId", id);
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
            <div className="playlist-page">
                <header>
                    <div className="menu_side_playlist">
                        <h1>Danh sách phát</h1>

                        <div className="playlist-side">
                            <h4 onClick={() => goHomePage()} id="home" className="active-playlist"><span></span><i className="bi bi-music-note-beamed"></i> Trang chủ</h4>
                            <h4 className="active-playlist"><span></span><i className="bi bi-music-note-beamed"></i> Nhạc của tôi</h4>
                        </div>
                    </div>

                    <div className="song_side_playlist">
                        <nav>
                            <div className="back-button" onClick={() => goHomePage()}>
                                <i className="bi bi-chevron-left"></i>
                            </div>
                            <div id="user" className="user_playlist" >
                                {isUser.map((item, i) => (
                                    <img key={i} src={item.imgUrl} alt=''></img>
                                ))}
                            </div>
                        </nav>
                        <div className="right">
                            <div className="playlist-header" >
                                <div className="playlist-content" data-toggle="modal" data-target="#exampleModal">
                                    <div id="playlist-cover" className="playlist-cover">
                                        <img src={playlistInfo && playlistInfo.imgUrl} alt=''></img>
                                    </div>
                                    <div id="playlist-info" className="playlist-info">
                                        <div className="playlist-public">Danh sách phát</div>
                                        <div className="playlist-title">{playlistInfo && playlistInfo.name}</div>
                                        <div style={{ height: '10px' }}></div>
                                        <div className="playlist-stats">
                                            <img src="../assets/images/spotify-logo.png" width="24px" height="24px" alt=""></img>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="playlist-songs-container" style={{ padding: "20px 20px 20px 20px" }}>
                                <div className="playlist-buttons">
                                    <div className="playlist-buttons-left">
                                        <div className="playlist-buttons-resume-pause">
                                            <img id="btn-image" src="../assets/images/play.png" width="40px" height="40px" alt=''></img>
                                        </div>
                                        <div id="removePlaylist" className="playlist-buttons-three-dot">
                                            <i className="bi bi-trash3"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="playlist-songs menu_song">
                                    <table id="songItem">
                                        <thead className='table-song-playlist'>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên bài hát</th>
                                                <th>Album</th>
                                                <th>Ngày</th>
                                                <th>Phát</th>
                                                <th>Xóa</th>
                                            </tr>
                                        </thead>

                                        {songPlaylist.map((item, i) => (
                                            <tbody key={i}>
                                                <tr className="songItem">
                                                    <td>{i + 1}</td>
                                                    <td className="song-title">
                                                        <div className="song-image">
                                                            <img src={item.song.imageUrl} alt=''></img>
                                                        </div>
                                                        <h5 className="song-name-album">
                                                            <div className="song-name">{item.song.name}</div>
                                                            <div className="subtitle">{item.song.singer}</div>
                                                        </h5>
                                                    </td>
                                                    <td className="song-album">{item.song.album.name}</td>
                                                    <td className="song-date-added">07/08/2023</td>
                                                    <td className="song">
                                                        <i className="bi playListPlay bi-play-circle-fill" id={item.song.id} ></i>
                                                    </td>
                                                    <td className="song">
                                                        <button type="button" className="btn btn-dark">-</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </table>
                                </div>

                                <div className="playlist-songs menu_song">
                                    <table id="songAddToPlaylist">
                                        <thead className='table-song-playlist'>
                                            <tr>
                                                <th>#</th>
                                                <th>Tên bài hát</th>
                                                <th>Album</th>
                                                <th>Phát</th>
                                                <th>Thêm</th>
                                            </tr>
                                        </thead>

                                        {isNotPlaylist.map((item, i) => (
                                            <tbody key={i}>
                                                <tr className="songItem">
                                                    <td>{i + 1}</td>
                                                    <td className="song-title">
                                                        <div className="song-image">
                                                            <img src={item.imageUrl} alt=''></img>
                                                        </div>
                                                        <h5 className="song-name-album">
                                                            <div className="song-name">{item.name}</div>
                                                            <div className="subtitle">{item.singer}</div>
                                                        </h5>
                                                    </td>
                                                    <td className="song-album">{item.album.name}</td>
                                                    <td className="song">
                                                        <i className="bi playListPlay bi-play-circle-fill" id={item.id} ></i>
                                                    </td>
                                                    <td className="song">
                                                        <button type="button" className="btn btn-dark">+</button>
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
