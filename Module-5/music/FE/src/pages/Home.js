import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { setupScrollListeners } from "./myjs/Scroll";
import { setupListenMusic } from "./myjs/Music";
import $ from 'jquery';

export default function Home() {
    const navigate = useNavigate();
    const { listAlbum, listMusic, listPlay, isUser } = useContext(AppContext);

    const [seekValue, setSeekValue] = useState(0);
    const [volValue, setVolValue] = useState(0);

    const handleSeekChange = (event) => {
        setSeekValue(event.target.value);
    };

    const handleVolChange = (event) => {
        setVolValue(event.target.value);
    };

    useEffect(() => {
        setupScrollListeners();
        setupListenMusic();
    }, []);

    const listenMusic = (id) => {
        console.log(id);
    };

    const goToAlbum = (AlbumId) => {
        navigate(`/album/` + AlbumId);
    };

    const showInfo = () => {
        $('.profile-menu').toggle();
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
                                    <li key={i} className="song-Item">
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
                                            <li data-toggle="modal" data-target="#myModal">Đăng xuất</li>
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
                                                <th>
                                                    {/* <img src="../assets/images/Duration.svg" alt=""></img> */}
                                                </th>
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

                    <div className="master_play">
                        <div className="wave">
                            <div className="wave1"></div>
                            <div className="wave1"></div>
                            <div className="wave1"></div>
                        </div>
                        <img src="../assets/images/HoaMinzy.jpg" id="poster_master_play" alt='Hoa'></img>
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
                            <input type="range" id="seek" min={0} max={100} value={seekValue}
                                onChange={handleSeekChange}></input>
                            <div className="bar2" id="bar2"></div>
                            <div className="dot"></div>
                        </div>
                        <span id="currentEnd">0:00</span>

                        <div className="vol">
                            <i className="bi bi-volume-down-fill" id="vol_icon"></i>
                            <input type="range" id="vol" min={0} max={100} value={volValue}
                                onChange={handleVolChange}></input>
                            <div className="vol_bar"></div>
                            <div className="dot" id="vol_dot"></div>
                        </div>
                    </div>
                </header>
            </div>

        </>
    )
}
