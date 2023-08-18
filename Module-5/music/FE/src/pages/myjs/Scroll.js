export function setupScrollListeners() {
    const left_scroll = document.getElementById("left_scroll");
    const right_scroll = document.getElementById("right_scroll");
    const pop_song = document.getElementsByClassName("pop_song")[0];

    const handleLeftScroll = () => {
        pop_song.scrollLeft -= 330;
    };

    const handleRightScroll = () => {
        pop_song.scrollLeft += 330;
    };

    left_scroll.addEventListener("click", handleLeftScroll);
    right_scroll.addEventListener("click", handleRightScroll);

    return () => {
        left_scroll.removeEventListener("click", handleLeftScroll);
        right_scroll.removeEventListener("click", handleRightScroll);
    };
}

