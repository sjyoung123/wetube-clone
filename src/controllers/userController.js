import User from "../models/User";
import fetch from "node-fetch";
import bcrypt, { compare } from "bcryptjs";

export const getJoin = (req, res) => {
  res.render("users/join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { email, username, password, password2, name, location } = req.body;
  const pageTitle = "Join";

  const exists = await User.exists({ $or: [{ email }, { username }] });
  if (exists) {
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: "This email or username is already taken.",
    });
  }
  if (password !== password2) {
    return res.status(400).render("users/join", {
      pageTitle,
      errorMessage: "Confirmation Password does not match.",
    });
  }

  try {
    await User.create({
      email,
      username,
      password,
      name,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.render("users/join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) =>
  res.render("users/login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "An account with username does not exists.",
    });
  }
  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) {
    return res.status(400).render("users/login", {
      pageTitle,
      errorMessage: "Wrong Password.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.redirect("/login");
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        email: emailObj.email,
        socialOnly: true,
        avatarUrl: userData.avatar_url,
        username: userData.name,
        password: "",
        name: userData.name ? userData.name : userData.login,
        location: userData.location,
      });
    } else {
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
  } else {
    return res.redirect("/login");
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
export const getEdit = (req, res) => {
  res.render("users/edit-profile", { pageTitle: "Edit-profile" });
};
export const postEdit = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { name, email, username, location },
  } = req;
  const findByUsername = await User.findOne({ username });
  const findByEmail = await User.findOne({ email });
  if (
    (findByUsername != null && findByUsername._id != _id) ||
    (findByEmail != null && findByEmail._id != _id)
  ) {
    return res.render("users/edit-profile", {
      pageTitle: "Edit-Profile",
      errorMessage: "This email or username is already taken.",
    });
  }
  const user = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      username,
      location,
    },
    { new: true }
  );
  req.session.user = user;
  return res.redirect("edit");
};
export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }

  return res.render("users/change-password", { pageTitle: "Change-password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id, password },
    },
    body: { oldPass, newPass, newPassConfirm },
  } = req;
  const matchPass = await bcrypt.compare(oldPass, password);
  if (!matchPass) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change-Password",
      errorMessage: "The current password is not correct",
    });
  }
  if (newPass !== newPassConfirm) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change-Password",
      errorMessage: "New password does not match confirmation",
    });
  }
  const user = await User.findById(_id);
  user.password = newPass;
  await user.save();

  return res.redirect("logout");
};

export const see = (req, res) => res.send("See user");
