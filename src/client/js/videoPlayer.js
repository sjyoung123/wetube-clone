const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const nowTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handlePlayBtnClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

let volumeValue = 0.5;
video.volume = volumeValue;
const handleMuteBtnClick = () => {
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

const handleTotalTime = (event) => {
  const {
    target: { duration },
  } = event;
  totalTime.innerText = formatTime(Math.floor(duration));
};
const handleCurrentTime = (event) => {
  const {
    target: { currentTime },
  } = event;
  nowTime.innerText = formatTime(Math.floor(currentTime));
};

playBtn.addEventListener("click", handlePlayBtnClick);
muteBtn.addEventListener("click", handleMuteBtnClick);
volumeRange.addEventListener("input", handleVolumeRange);
video.addEventListener("loadedmetadata", handleTotalTime);
video.addEventListener("timeupdate", handleCurrentTime);

// video.addEventListener("loadedmetadata", function (event) {
//   setInterval(() => {
//     let {
//       target: { currentTime },
//     } = event;
//     nowTime.innerText = Math.round(currentTime);
//   }, 1000);
// });
