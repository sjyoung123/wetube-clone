import express from "express";
import morgan from "morgan";
import session from "express-session";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

const logger = morgan("dev");
const app = express();

//app.disable("x-powered-by");

app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(logger);

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "hello",
    resave: true,
    saveUninitialized: true,
  })
); //Created before Router.

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
