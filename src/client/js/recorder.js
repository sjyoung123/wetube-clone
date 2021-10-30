import regeneratorRuntime, { async } from "regenerator-runtime";

const startRecordBtn = document.getElementById("startRecord");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const handleDownload = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm";
  document.body.appendChild(a);
  a.click();
};

const handleStop = () => {
  startRecordBtn.innerText = "Download recording";
  startRecordBtn.removeEventListener("click", handleStop);
  startRecordBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  startRecordBtn.innerText = "Stop recording";
  startRecordBtn.removeEventListener("click", handleStart);
  startRecordBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (event) => {
    videoFile = URL.createObjectURL(event.data);
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
