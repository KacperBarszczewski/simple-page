let vid = document.getElementById("mainVideo");
let svgmut = document.getElementById("svgmut");
let progressBar = document.getElementById("seek");
let volumeBar = document.getElementById('volume-bar');
let pauseplayid = document.getElementById('pauseplay-id');
let pauseplayimg = document.getElementById('pauseplay-img');
let host = location.host;

vid.addEventListener('timeupdate', updateProgressBar, false);


window.onload = () => {
    vid.volume = volumeBar.value;
};

function changeMut() {
    vid.muted = !vid.muted;
    checkMut();
}

function checkMut() {
    vid.muted ? svgmut.src = 'assets/volumeoff.svg' : svgmut.src = 'assets/volumeon.svg';
}

//progressBar
function updateProgressBar() {
    let percentage = Math.floor((100 / vid.duration) * vid.currentTime);
    progressBar.value = percentage;
    progressBar.style.backgroundSize = percentage + '%';

}

progressBar.addEventListener("click", (e) => {
    vid.currentTime = (e.offsetX / progressBar.offsetWidth) * vid.duration;
});

progressBar.addEventListener("change", (evt) => {
    vid.currentTime = (evt.target.value / 100) * vid.duration;
});


//volumeBar
volumeBar.addEventListener("change", (evt) => {
    vid.volume = evt.target.value;
});

//playPauseVideo
pauseplayid.addEventListener("click", () => {
    playPauseVideo();
});

function playPauseVideo() {
    const newspaperSpinning = [
        { opacity: 0 }, { opacity: 0.8 }, { opacity: 0 }
    ];

    const newspaperTiming = {
        duration: 500,
        iterations: 1,
    };

    vid.paused ? vid.play() : vid.pause();
    vid.paused ?  pauseplayimg.src='assets/pause.svg': pauseplayimg.src='assets/play.svg';

    pauseplayid.animate(newspaperSpinning, newspaperTiming);


}



//change video
var vids = ["movies/1.mp4", "movies/2.mp4", "movies/3.mp4"];

function arrayUp(i) {
    vids
    return i
}

function arrowUp() {
    let i = 0;

    if ((vids.indexOf(vid.attributes.src.value) + 1) <= vids.length - 1) {
        i = (vids.indexOf(vid.attributes.src.value) + 1)
    } else {
        i = 0
    }

    vid.pause();
    vid.setAttribute('src', vids[i]);
    vid.load();
    vid.play();
    updateProgressBar();
}

function arrowDown() {
    let i = 0;

    if ((vids.indexOf(vid.attributes.src.value) - 1) >= 0) {
        i = (vids.indexOf(vid.attributes.src.value) - 1)
    } else {
        i = vids.length - 1;
    }

    vid.pause();
    vid.setAttribute('src', vids.at(i));
    vid.load();
    vid.play();
    updateProgressBar();
}