import express from "express";

const router = express.Router();
import userController from "../controllers/userController.js";
import isAuthenticated from "../middleware/auth.js";

router.post("/add", userController.createUser);
router.get("/get/:id", isAuthenticated, userController.fetchUserById);
router.post("/login", userController.userLogin);
router.post("/logout", isAuthenticated, userController.userLogout);
router.get("/authenticate", userController.isAuthenticate);

export default router;
