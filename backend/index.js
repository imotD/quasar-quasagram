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
  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    file
      .on("data", (data) => {
        console.log(`File [${name}] got ${data.length} bytes`);
      })
      .on("close", () => {
        console.log(`File [${name}] done`);
      });
  });
  bb.on("field", (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
  });
  bb.on("close", () => {
    console.log("Done parsing form!");
    // res.writeHead(303, { Connection: "close", Location: "/" });
    res.send("Done parsing form!");
  });
  req.pipe(bb);

  // res.send(req.headers);
});

app.listen(port);
