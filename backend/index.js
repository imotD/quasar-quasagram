// CONFIG - DEPENDENCIES
const express = require("express");
const busboy = require("busboy");

const path = require("path");
const os = require("os");
const fs = require("fs");
let UUID = require("uuid-v4");

const app = express();
const port = process.env.PORT || 3000;

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");

// CONFIG - FIREBASE
const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: "gs://quasagram-cbfcd.appspot.com",
});

const db = getFirestore();
let bucket = getStorage().bucket();

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

  const uuid = UUID();
  const bb = busboy({ headers: req.headers });

  let fields = {};
  let fileData = {};

  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;

    let filepath = path.join(os.tmpdir(), filename);

    file.pipe(fs.createWriteStream(filepath));
    fileData = { filepath, mimeType };
  });

  bb.on("field", (name, val, info) => {
    fields[name] = val;
  });

  bb.on("close", () => {
    bucket.upload(
      fileData.filepath,
      {
        upload: "media",
        metadata: {
          metadata: {
            contentType: fileData.mimeType,
            firebaseStorageDownloadTokens: uuid,
          },
        },
      },
      (err, uploadedFile) => {
        if (!err) {
          createDocument(uploadedFile);
        }
      }
    );

    function createDocument(uploadedFile) {
      db.collection("posts")
        .doc(fields.id)
        .set({
          id: fields.id,
          date: parseInt(fields.date),
          caption: fields.caption,
          location: fields.location,
          imageUrl: `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${uploadedFile.name}?alt=media&token=${uuid}`,
        })
        .then(() => {
          res.send("Post added: " + fields.id);
        });
    }
  });

  req.pipe(bb);
});

app.listen(port);
