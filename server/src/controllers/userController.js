import passport from "passport";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import userDto from "./../dtos/userDto.js";

class userController {
  async createUser(req, res) {
    try {
      const user = await userModel.findOne({ email: req.body.email });
      if (user) {
        return res.json({ error: "User already exists", status: false });
      }
      const { name, email, password } = req.body;
      const passwordHash = await bcrypt.hash(password, 10);

      const newData = new userModel({ name, email, password: passwordHash });

      // const newUser = await userModel.create({
      //   ...req.body,
      //   password: passwordHash,
      // });

      const newUser = await newData.save();

      if (!newUser) {
        return res.json({ error: "User not created", status: false });
      }
      res.json({ user: newUser, status: true });
    } catch (error) {
      console.log(error);
      res.json({ error: error.message });
    }
  }

  async userLogin(req, res) {
    try {
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          return res.json({ error: err.message, status: false });
        }
        if (!user) {
          return res.json({ error: info.message, status: false });
        }
        req.logIn(user, (err) => {
          if (err) {
            return res.json({ error: err.message, status: false });
          }

          res.status(200).json({
            user: new userDto(user),
            message: "User login successfully",
            status: true,
          });
        });
      })(req, res);
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
  async updateUser(req, res) {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ error: "User not found", status: false });
      }
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json({ user: updatedUser, status: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async deleteUser(req, res) {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(400).json({ error: "User not found", status: false });
      }
      const deletedUser = await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ user: deletedUser, status: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getAllUsers(req, res) {
    try {
      const users = await userModel.find();
      if (!users) {
        return res
          .status(400)
          .json({ error: "Users not found", status: false });
      }
      res.status(200).json({ users: users, status: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async userLogout(req, res) {
    req.logout(function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to log out" });
      } else {
        res.status(200).json({ message: "Logged out successfully" });
      }
    });
  }
  async isAuthenticate(req, res) {
    if (req.user) {
      return res.json({ valid: true, user: new userDto(req.user) });
    } else {
      return res.json({ valid: false });
    }
  }
}

export default new userController();
