const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// endpoint POST
app.get("/post", (req, res) => {
  let posts = [
    {
      id: 1,
      caption: "Swiss Mountain",
      date: 1671343003981,
      location: "Tanah Abang, Indonesia",
      imageUrl: "https://cdn.quasar.dev/img/mountains.jpg",
    },
    {
      id: 2,
      caption: "Swiss Mountain",
      date: 1671343003981,
      location: "Tanah Abang, Indonesia",
      imageUrl: "https://cdn.quasar.dev/img/mountains.jpg",
    },
    {
      id: 3,
      caption: "Swiss Mountain",
      date: 1671343003981,
      location: "Tanah Abang, Indonesia",
      imageUrl: "https://cdn.quasar.dev/img/mountains.jpg",
    },
  ];

  res.send(posts);
});

app.listen(port);
