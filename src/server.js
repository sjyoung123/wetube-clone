import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const logger = morgan("dev");
const app = express();
const PORT = "4000";

//app.disable("x-powered-by");

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(logger);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const handleListening = () => {
  console.log(`server listening on port https://localhost:${PORT}`);
};

app.listen(PORT, handleListening); //ctrl + c => kill the server
