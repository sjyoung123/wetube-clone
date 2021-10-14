import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const { email, username, password, name, location } = req.body;
  await User.create({
    email,
    username,
    password,
    name,
    location,
  });
  return res.redirect("/login");
};
export const login = (req, res) => res.send("Log in");
export const edit = (req, res) => res.send("Edit user");
export const remove = (req, res) => res.send("Remove user");
export const see = (req, res) => res.send("See user");
export const logout = (req, res) => res.send("Log out");
