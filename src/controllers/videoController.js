const fakeUser = {
    username:"codeyoung",
    loggedIn: true,
};

export const trending = (req,res) => res.render("home",{pageTitle:"Home",fakeUser,});
export const search = (req,res) => res.send("Search video");
export const see = (req,res) => res.render("watch",{pageTitle:"Watch"});
export const edit = (req,res) => res.render("edit",{pageTitle:"Edit"});
export const upload = (req,res) => res.send("Upload video");
export const deleteVideo = (req,res) => res.send("Delete video");
