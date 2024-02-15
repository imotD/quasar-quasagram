// CONFIG - DEPENDENCIES
const express = require("express");
const busboy = require("busboy");
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

// CONFIG - ENDPOINT CREATE
app.post("/createPost", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  const bb = busboy({ headers: req.headers });
  let fields = {};

  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;

    file
      .on("data", (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
      })
      .on("close", () => {
        console.log(`File [${name}] done`);
      });
  });

  bb.on("field", (name, val, info) => {
    fields[name] = val;
  });

  bb.on("close", () => {
    db.collection("posts")
      .doc(fields?.id)
      .set({
        id: fields.id,
        date: parseInt(fields.date),
        caption: fields.caption,
        location: fields.location,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/quasagram-cbfcd.appspot.com/o/piramida%20freelance.jpeg?alt=media&token=7c2a3f53-cd60-416e-b6bc-2a2a183a7763",
      });

    res.send("Done parsing form!");
  });
  req.pipe(bb);
});

app.listen(port);
