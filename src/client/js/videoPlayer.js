const video = document.getElementById("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const nowTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const handlePlayBtnClick = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  playBtn.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

let volumeValue = 0.5;
video.volume = volumeValue;
const handleMuteBtnClick = () => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.classList = video.muted ? "fas fa-volume-up" : "fas fa-volume-mute";
  volumeRange.value = video.muted ? 0 : volumeValue;
};
const handleVolumeRange = (event) => {
  const {
    target: { value },
  } = event;
  if (video.muted) {
    video.muted = false;
    muteBtn.classList = "fas fa-volume-mute";
  }

  volumeValue = Number(value);
  video.volume = value;

  if (volumeValue === 0) {
    video.muted = true;
    muteBtn.classList = "fas fa-volume-up";
  }
};

const handleTotalTime = (event) => {
  const {
    target: { duration },
  } = event;
  totalTime.innerText = formatTime(Math.floor(duration));
  timeline.max = Math.floor(duration); //set max timeline
};
const handleCurrentTime = (event) => {
  const {
    target: { currentTime },
  } = event;
  nowTime.innerText = formatTime(Math.floor(currentTime));
  timeline.value = Math.floor(currentTime); //set current timeline
};

const handleTimeline = (event) => {
  const {
    target: { value },
  } = event;
  video.currentTime = value;
};

const handleFullScreen = () => {
  let fullscreen = document.fullscreenElement;
  if (fullscreen) {
    document.exitFullscreen();
    fullScreenBtn.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtn.classList = "fas fa-compress";
  }
};

const hidecontrols = () => videoControls.classList.remove("show");
let setTimeOutLeaveId = null;
let setTimeOutMovementId = null;

const handleMouseMove = () => {
  if (setTimeOutLeaveId) {
    clearTimeout(setTimeOutLeaveId);
    setTimeOutLeaveId = null;
  }
  if (setTimeOutMovementId) {
    clearTimeout(setTimeOutMovementId);
    setTimeOutMovementId = null;
  }
  videoControls.classList.add("show");
  setTimeOutMovementId = setTimeout(hidecontrols, 3000);
};
const handleMouseLeave = () => {
  setTimeOutLeaveId = setTimeout(hidecontrols, 3000);
};
const handleVideoClick = () => {
  handlePlayBtnClick();
};

const handleKeydown = (event) => {
  switch (event.keyCode) {
    case 32: //space
      handlePlayBtnClick();
      break;
    case 70: //f
      handleFullScreen();
      break;
    case 39: //right arrow
      video.currentTime = Math.floor(video.currentTime + 5);
      break;
    case 37: //left arrow
      video.currentTime = Math.floor(video.currentTime - 5);
      break;
    case 38: //up arrow
      volumeValue += 0.1;
      volumeRange.value = volumeValue;
      video.volume = volumeRange.value;
      event.preventDefault();
      break;
    case 40: //down arrow
      volumeValue -= 0.1;
      volumeRange.value = volumeValue;
      video.volume = volumeRange.value;
      event.preventDefault();
      break;
    case 77: //m
      handleMuteBtnClick();
  }
};

playBtn.addEventListener("click", handlePlayBtnClick);
muteBtn.addEventListener("click", handleMuteBtnClick);
volumeRange.addEventListener("input", handleVolumeRange);
video.addEventListener("loadedmetadata", handleTotalTime);
video.addEventListener("timeupdate", handleCurrentTime);
video.addEventListener("click", handleVideoClick);
window.addEventListener("keydown", handleKeydown);
timeline.addEventListener("input", handleTimeline);
fullScreenBtn.addEventListener("click", handleFullScreen);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);

//32 === space 70 === f -> === 39  <- === 37  up === 38 down === 40
