import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Session from "express-session";
import passport from "passport";
import passportInit from "./services/passport.js";
import router from "./routes/routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/Auth")
  .then((res) => {
    console.log("Db connected");
  })
  .catch((err) => {
    console.log("Failed");
  });

// express session

app.use(morgan("dev"));
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  Session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    cookie: { maxAge: oneDay, secure: false },
    resave: false,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.static("public"));
const port = process.env.PORT || 3200;

// passport js setup
app.use(passport.initialize());
app.use(passport.session());
passportInit(passport);

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
