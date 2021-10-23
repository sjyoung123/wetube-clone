const video = document.getElementById("video");

const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volumeRange = document.getElementById("volume");

const handlePlayBtnClick = (e) => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

// const handleMuteBtnClick = (e) => {
//   if (video.muted) {
//     video.muted = false;
//   } else {
//     video.muted = true;
//   }
//   muteBtn.innerText = video.muted ? "Unmute" : "Mute";
//   volumeRange.value = video.muted ? 0 : 0.5;
//   video.volume = volumeRange.value;
// };

// const handleVolumeRange = (e) => {
//   video.volume = volumeRange.value;
//   if (volumeRange.value == 0) {
//     muteBtn.innerText = "Unmute";
//   } else {
//     muteBtn.innerText = "Mute";
//   }
// };

let volumeValue = 0.5;
video.volume = volumeValue;
const handleMuteBtnClick = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }

  volumeValue = Number(value);
  video.volume = value;

  if (volumeValue === 0) {
    video.muted = true;
    muteBtn.innerText = "Unmute";
  }
};

playBtn.addEventListener("click", handlePlayBtnClick);
muteBtn.addEventListener("click", handleMuteBtnClick);
volumeRange.addEventListener("input", handleVolumeRange);
