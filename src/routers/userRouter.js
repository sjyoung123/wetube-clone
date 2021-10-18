import express from "express";
import {
  getEdit,
  postEdit,
  see,
  logout,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/userController";
import { loggedInOnlyMiddleware, loggedOutOnlyMiddleware } from "../middleware";
const userRouter = express.Router();

userRouter.get("/logout", logout, loggedInOnlyMiddleware);
userRouter
  .route("/edit")
  .all(loggedInOnlyMiddleware)
  .get(getEdit)
  .post(postEdit);
userRouter.get("/github/start", startGithubLogin, loggedOutOnlyMiddleware);
userRouter.get("/github/finish", finishGithubLogin, loggedOutOnlyMiddleware);

userRouter.get("/:id(\\d+)", see);

export default userRouter;
