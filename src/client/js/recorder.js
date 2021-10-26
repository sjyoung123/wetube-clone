import regeneratorRuntime from "regenerator-runtime";

const startRecordBtn = document.getElementById("startRecord");
const video = document.getElementById("preview");

const handleRecBtn = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: true,
  });
  video.srcObject = stream;
  video.play();
};

startRecordBtn.addEventListener("click", handleRecBtn);
