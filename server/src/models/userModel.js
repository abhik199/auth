import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
});

export default model("User", userSchema);
