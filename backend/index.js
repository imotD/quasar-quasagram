// CONFIG - DEPENDENCIES
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// CONFIG - FIREBASE
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// CONFIG - ENDPOINT POST
app.get("/posts", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  let posts = [];

  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      res.send(posts);
    });
});

app.listen(port);
