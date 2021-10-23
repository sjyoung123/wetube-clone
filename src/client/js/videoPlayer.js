const video = document.getElementById("video");

const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");

const handlePlayBtnClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};
const handlePlay = (e) => (playBtn.innerText = "Pause");
const handlePause = (e) => (playBtn.innerText = "Play");

playBtn.addEventListener("click", handlePlayBtnClick);
video.addEventListener("play", handlePlay);
video.addEventListener("pause", handlePause);
