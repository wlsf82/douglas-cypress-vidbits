const { mongoose } = require("../database");

const Video = mongoose.model(
  "Video",
  mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    url: {
      type: String,
      required: true
    }
  })
);

module.exports = Video;
