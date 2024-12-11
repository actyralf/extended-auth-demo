import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import { firebaseRequireAuth } from "./middleware/firebaseRequireAuth.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my server!" });
});

app.get("/profile", firebaseRequireAuth, (req, res) => {
  return res.json({
    msg: "Here comes your profile data!",
  });
});

app.listen(PORT, () => {
  console.log("api running on port " + PORT);
});
