export const trending = (req,res) => res.render("Home");
export const search = (req,res) => res.send("Search video")
export const see = (req,res) => res.send("Watch video");
export const edit = (req,res) => res.send("Edit video");
export const upload = (req,res) => res.send("Upload video");
export const deleteVideo = (req,res) => res.send("Delete video");