import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  //   if (req.session.loggedIn) {
  //     res.locals.loggedIn = true;
  //   }
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};
  //console.log(res.locals);
  next();
};
//res.locals => 모든 템플릿에서 공유한다.

export const loggedInOnlyMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};
export const loggedOutOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const uploadFile = multer({ dest: "upload/" });
