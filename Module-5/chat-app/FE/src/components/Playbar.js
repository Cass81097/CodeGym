import { useState } from "react";

export default function Playbar() {
    const [seekValue, setSeekValue] = useState(0);
    const [volValue, setVolValue] = useState(0);

    const handleSeekChange = (event) => {
        setSeekValue(event.target.value);
    };

    const handleVolChange = (event) => {
        setVolValue(event.target.value);
    };

    return (
        <>
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
        </>
    )
}
