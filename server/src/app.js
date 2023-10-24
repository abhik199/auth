import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/Auth")
  .then((res) => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("Failed");
  });

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
