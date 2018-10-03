const router = require("express").Router();

const Video = require("../models/video");

router.get("/", async (req, res, next) => {
  res.redirect("/videos");
});

router.get("/videos", async (req, res, next) => {
  const videos = await Video.find({});

  res.render("videos/index", { videos });
});

router.get("/videos/create", async (req, res, next) => {
  const videos = await Video.find({});

  res.render("videos/create", { videos });
});

router.get("/videos/:id", async (req, res, next) => {
  const video = await Video.findById({ _id: req.params.id });

  res.render("videos/show", { video });
});

router.get("/videos/:id/edit", async (req, res, next) => {
  const video = await Video.findById({ _id: req.params.id });

  res.render("videos/edit", { video });
});

router.post("/videos", async (req, res, next) => {
  const { title, description, url } = req.body;

  const newVideo = new Video({
    title,
    description,
    url
  });

  newVideo.validateSync();

  if (newVideo.errors) {
    res.status(400).render("videos/create", { newVideo });
  } else {
    const video = await newVideo.save();

    res.status(201).render("videos/show", { video });
  }
});

router.post("/videos/:id/edit", async (req, res, next) => {
  const videoId = req.params.id;
  const video = await Video.findById({ _id: videoId });
  const { title, description, url } = req.body;

  const updatedVideo = new Video({
    title,
    description,
    url
  });

  updatedVideo.validateSync();

  if (updatedVideo.errors) {
    if (updatedVideo.errors.title) {
      video.title = "";
    }
    if (updatedVideo.errors.url) {
      video.url = "";
    }
    res.status(400).render("videos/edit", { updatedVideo, video });
  } else {
    await Video.findOneAndUpdate({ _id: videoId }, req.body, error => {
      if (error) return res.send(error);
      res.redirect(`/videos/${videoId}`);
    });
  }
});

router.post("/videos/:id/delete", async (req, res, next) => {
  Video.remove({ _id: req.params.id }, error => {
    if (error) return res.send(error);
    res.redirect("/");
  });
});

module.exports = router;
