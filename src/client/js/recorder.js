import regeneratorRuntime from "regenerator-runtime";

const startRecordBtn = document.getElementById("startRecord");
const video = document.getElementById("preview");

let stream;
let recorder;

const handleStop = () => {
  startRecordBtn.innerText = "Start recording";
  startRecordBtn.removeEventListener("click", handleStop);
  startRecordBtn.addEventListener("click", handleStart);
  recorder.stop();
};

const handleStart = () => {
  startRecordBtn.innerText = "Stop recording";
  startRecordBtn.removeEventListener("click", handleStart);
  startRecordBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    const videoFile = URL.createObjectURL(event.data);
    video.srcObject = null;
    video.src = videoFile;
    video.loop = true;
    video.play();
  };

  recorder.start();
};

const streamInit = async () => {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};
streamInit();
startRecordBtn.addEventListener("click", handleStart);
