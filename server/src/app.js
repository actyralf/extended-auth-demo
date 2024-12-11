import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { firebaseRequireAuth } from "./middleware/firebaseRequireAuth.js";

const PORT = process.env.PORT || 3000;
const app = express();

const profileData = {};

const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      return resolve();
    }, ms);
  });
};

// {"sdkjfhksdjfh":{ city:"Bonn"},"sdjhfsdjhfg":{}}

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  return res.json({ message: "Welcome to my server!" });
});

app.post("/profile", firebaseRequireAuth, async (req, res) => {
  console.log(req.body);
  profileData[req.user.uid] = { city: req.body.city };
  console.log(profileData);
  await wait(2000);
  // await firebaseAdmin
  //   .auth()
  //   .setCustomUserClaims(req.user.uid, { completed: true });
  return res.json(profileData[req.user.uid]);
});

app.get("/profile", firebaseRequireAuth, async (req, res) => {
  await wait(2000);

  return res.json({ profile: profileData[req.user.uid] });
});

app.listen(PORT, () => {
  console.log("api running on port " + PORT);
});
