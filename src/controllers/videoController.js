export const trending = (req, res) => {
  const videos = [
    {
      title: "first video",
      rating: 4,
      comments: 2,
      createAt: "2 minutes ago",
    },
    {
      title: "second video",
      rating: 4,
      comments: 2,
      createAt: "2 minutes ago",
    },
    {
      title: "Third video",
      rating: 4,
      comments: 2,
      createAt: "2 minutes ago",
    },
  ];
  return res.render("home", { pageTitle: "Home", videos });
};
export const search = (req, res) => res.send("Search video");
export const see = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" });
export const upload = (req, res) => res.send("Upload video");
export const deleteVideo = (req, res) => res.send("Delete video");
