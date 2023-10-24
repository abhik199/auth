import userModel from "../models/userModel";
import bcrypt from "bcrypt";

class userController {
  async createUser(req, res) {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User already exists", status: false });
      }
      const passwordHash = await bcrypt.hash(req.body.password, 10);
      const newUser = await userModel.create({
        ...req.body,
        password: passwordHash,
      });

      if (!newUser) {
        return res
          .status(400)
          .json({ error: "User not created", status: false });
      }
      res.status(201).json({ user: newUser, status: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async userLogin(req, res) {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(400).json({ error: "User not found", status: false });
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ error: "Invalid password", status: false });
      }
      res.status(200).json({ user: user, status: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async fetchUserById(req, res) {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ error: "User not found", status: false });
      }
      res.status(200).json({ user: user, status: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
