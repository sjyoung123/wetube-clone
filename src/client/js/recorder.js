// import regeneratorRuntime from "regenerator-runtime";

const startRecordBtn = document.getElementById("startRecord");

const handleRecBtn = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });
  console.log(stream);
};

startRecordBtn.addEventListener("click", handleRecBtn);
