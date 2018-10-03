#!/usr/bin/env node
const { mongoose, databaseUrl, options } = require("../database");
const Item = require("../models/video");

const seed = async () => {
  await mongoose.connect(
    databaseUrl,
    options
  );
  const video1 = {
    title: "Chaos and intuition engineering",
    description:
      "GOTO 2016 • Chaos & Intuition Engineering at Netflix • Casey Rosenthal.",
    url: "https://www.youtube.com/embed/Q4nniyAarbs"
  };
  const video2 = {
    title: "appear.in & Star Wars",
    description:
      "This is a long description. Sed ut perspiciatis unde omnis" +
      "iste natus error sit voluptatem accusantium doloremque laudantium, totam" +
      "rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto" +
      "beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas" +
      "sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui" +
      "ratione voluptatem sequi nesciunt.",
    url: "https://www.youtube.com/embed/vHTIYVHTSxA"
  };

  await Item.create(video1);
  await Item.create(video2);
};

seed()
  .then(() => {
    console.log("Seeded database sucessfully");
    process.exit(0);
  })
  .catch(err => {
    console.log("Database seed unsuccessful");
    throw err;
    process.exit(1);
  });
