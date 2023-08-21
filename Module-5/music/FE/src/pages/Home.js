import './my-style/home/playlist.css'
import './my-style/home/styles.css'
import './my-style/home/upload.css'

import Playbar from '../components/Playbar';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { HomeContext } from "../Context/HomeContext";
import { setupScrollListeners } from "./myjs/Scroll";
import { setupListenMusic } from "./myjs/Music";
import { Field, Formik, Form } from "formik";
import $ from 'jquery';
import axios from "axios";
import uploadImage from './myjs/Upload';

export default function Home() {
    const navigate = useNavigate();
    const { listAlbum, listMusic, listPlay, isUser } = useContext(HomeContext);
    const userId = localStorage.getItem('userId')

    const handleSubmit = async (data) => {
        try {
            await axios.post("http://localhost:3000/playlists", data);
            console.log(data);

        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    useEffect(() => {
        setupScrollListeners();
        setupListenMusic();
    }, []);

    const listenMusic = (id) => {
        console.log(id);
    };

    const goToAlbum = (albumId) => {
        navigate(`/album/` + albumId);
    };

    const showInfo = () => {
        $('.profile-menu').toggle();
    };

    const logout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <div className="home">
                <header>
                    <div className="menu_side">
                        <h1>Trang chủ</h1>

                        <div className="playlist">
                            <h4 className="active"><span></span><i className="bi bi-music-note-beamed"></i> Trang chủ</h4>
                            <h4 id="playlist" className="active"><span></span><i className="bi bi-music-note-beamed"></i> Nhạc của tôi</h4>
                        </div>

                        <div className="menu_song">
                            <div className="menu-bar">
                                <div className="add-playlist">
                                    <i data-toggle="modal" data-target="#exampleModal"
                                        className="bi bi-plus-circle"> Thêm</i>
                                </div>
                                <div className="sort-bar">
                                    <li className="sub-menu" style={{ display: "block" }}>
                                        <Link to={'#'} className="feat-btn">
                                            <i className='bx bx-sort-alt-2 icon'></i>
                                            <span className="text nav-text">Sắp xếp</span>
                                            <span className="fas fa-caret-down first"></span>
                                        </Link>
                                        <ul className="feat-show">
                                            <li>
                                                <Link to={'#'}>
                                                    <i className='bx bx-id-card icon'></i>A-Z</Link>
                                            </li>
                                            <li>
                                                <Link to={'#'} id="sort">
                                                    <i className='bx bx-purchase-tag icon'></i>Z-A</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </div>
                            </div>

                            <div id="playList" className="songList">
                                {listPlay.map((item, i) => (
                                    <li key={i} className="song-Item" onClick={() => navigate(`/playlist/` + item.id)}>
                                        <img src={item.imgUrl} alt=''></img>
                                        <h5>
                                            {item.name}
                                            <div className="subtitle">{item.description}</div>
                                        </h5>
                                    </li>
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="song_side">
                        <nav className="navBar">
                            <div className="search">
                                <i className="bi bi-search"></i>
                                <input id="search-input" type="search" placeholder="Tìm kiếm nhạc..." />
                            </div>
                            <div id="user" className="user">
                                {isUser.map((item, i) => (
                                    <div key={i}>
                                        <img src={item.imgUrl} className="profileUser" alt='' onClick={() => showInfo()} />
                                        <ol className="profile-menu" style={{ display: "none" }}>
                                            <li>Thông tin</li>
                                            <li data-toggle="modal" data-target="#myModal" onClick={() => logout()}>Đăng xuất</li>
                                        </ol>
                                    </div>
                                ))}
                            </div>
                        </nav>
                        <div className="right">

                            <div className="popular_song album">
                                <div className="h4">
                                    <h4>Album thịnh hành</h4>
                                    <div className="btn_s">
                                        <i id="left_scroll" className="bi bi-arrow-left-short"></i>
                                        <i id="right_scroll" className="bi bi-arrow-right-short"></i>
                                    </div>
                                </div>

                                <div id="albums" className="pop_song">
                                    {/* Album here */}
                                    {listAlbum.map((item, i) => (
                                        <li key={i} className="songAlbum">
                                            <div className="img_play">
                                                <img src={item.imgUrl} alt=""></img>
                                                <i className="bi bi-play-circle-fill" onClick={() => goToAlbum(item.id)}></i>
                                            </div>
                                            <h5>{item.name} <br></br>
                                                <div className="subtitle">{item.singer}</div>
                                            </h5>
                                        </li>
                                    ))}
                                </div>
                            </div>

                            <div className="playlist-songs-container">
                                <div className="playlist-songs menu_song">
                                    <table id="songItem">
                                        <thead className="table-song">
                                            <tr>
                                                <th>#</th>
                                                <th>Tên bài hát</th>
                                                <th>Album</th>
                                                <th>Ngày thêm</th>
                                                <th>Phát</th>
                                            </tr>
                                        </thead>

                                        {listMusic.map((item, i) => (
                                            <tbody key={i} >
                                                <tr className="songItem">
                                                    <td>{item.id}</td>
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
                                                    <td className="song-date-added">08/07/2023</td>
                                                    <td className="song">
                                                        <i className="bi playListPlay bi-play-circle-fill" id={item.id} onClick={() => listenMusic(item.id)}></i>
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

            {/* Add Playlist */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Thêm Playlist :</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <Formik
                            initialValues={{
                                name: "",
                                imgUrl: "",
                                description: "",
                                user: {
                                    id: userId
                                }
                            }}
                            onSubmit={handleSubmit}
                        >
                            <Form>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Tên :</label>
                                        <Field type="text" className="form-control" id="name" name="name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Mô tả :</label>
                                        <Field type="text" className="form-control" id="description" name="description" />
                                    </div>
                                    <div className="form-group mb-avatar">
                                        <label htmlFor="formFile" className="form-label inputCode"><span></span></label>
                                        <input type="file" id="image-upload" onChange={(e) => uploadImage(e)} hidden />
                                        <label htmlFor="image-upload" className="file-upload-button">Chọn ảnh :</label>
                                        <span id="file-name" style={{ fontSize: '0px' }}></span>
                                        <div className="info-progress">
                                            <div className="progress">
                                                <div id="upload-progress"
                                                    className="progress-bar progress-bar-striped progress-bar-animated"
                                                    role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
                                                    style={{ width: '0' }} hidden="">0%
                                                </div>
                                            </div>
                                            <div className="image-url" hidden>
                                                <img src="" alt="" id="image-url"></img>
                                            </div>
                                        </div>
                                        <Field id="image" className="form-control" type="text" name="imgUrl" hidden />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                    <button type="submit" className="btn btn-primary">Thêm</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    )
}
