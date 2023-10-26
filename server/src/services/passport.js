import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

export default function init(passport) {
  // Local Strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await userModel.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "Incorrect Email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user, { message: "Logged successfully" });
      }
    )
  );
  // Facebook Strategy

  passport.serializeUser((user, done) => {
    if (user) {
      return done(null, user.id);
    }
    return done(null, false);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  });
}
