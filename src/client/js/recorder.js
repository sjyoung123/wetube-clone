// import regeneratorRuntime, { async } from "regenerator-runtime";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionRecordBtn = document.getElementById("startRecord");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumb: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
};

const handleDownload = async () => {
  actionRecordBtn.removeEventListener("click", handleDownload);
  actionRecordBtn.innerText = "transcoding..";
  actionRecordBtn.disabled = true;

  const ffmpeg = createFFmpeg({
    corePath: "/static/ffmpeg-core.js",
    log: true,
  });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile));
  await ffmpeg.run("-i", files.input, "-r", "60", files.output);
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumb
  );

  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumFile = ffmpeg.FS("readFile", files.thumb);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
  const thumBlob = new Blob([thumFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob);
  const thumUrl = URL.createObjectURL(thumBlob);

  downloadFile(mp4Url, "MyRecording.mp4");

  downloadFile(thumUrl, "MyThumbnail.jpg");

  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumb);

  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumUrl);
  URL.revokeObjectURL(videoFile);

  streamInit();
  actionRecordBtn.disabled = false;
  actionRecordBtn.innerText = "recording again";
  actionRecordBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
  actionRecordBtn.innerText = "Download recording";
  actionRecordBtn.removeEventListener("click", handleStop);
  actionRecordBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  actionRecordBtn.innerText = "Stop recording";
  actionRecordBtn.removeEventListener("click", handleStart);
  actionRecordBtn.addEventListener("click", handleStop);
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
    video: {
      width: 1024,
      height: 576,
    },
  });
  video.srcObject = stream;
  video.play();
};
streamInit();
actionRecordBtn.addEventListener("click", handleStart);
