import express from "express";
import {
  addAccount,
  deleteUser,
  getAverageGrade,
  getCharges,
  getMyData,
  getMyCourse,
  getMyGrades,
  searchUser,
  getUsers,
  getUsersByRole,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  updateCharge,
  updateUser,
  updateContact,
  addGraduation,
  addGrades,
} from "../controllers/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Authentication middleware for all rotues
// userRouter.use(protectUser);

// Adding routes with functions from controller

userRouter.get("/", protectUser, getUsers);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/refresh", refreshToken);
userRouter.post("/account", protectUser, addAccount);
userRouter.put("/contact", protectUser, updateContact);

userRouter.get("/search/:query", protectUser, searchUser);
userRouter.put("/:id", protectUser, updateUser);
userRouter.delete("/:id", protectUser, deleteUser);

userRouter.get("/grades/me", protectUser, getMyGrades);
userRouter.get("/data/me", protectUser, getMyData);
userRouter.get("/course/me", protectUser, getMyCourse);

userRouter.get("/role/:role", protectUser, getUsersByRole);
userRouter.get("/grades/:userId", protectUser, getAverageGrade);
userRouter.post("/grades/:userId&:courseId&:subjectId", protectUser, addGrades);
userRouter.get("/charges/:courseId", protectUser, getCharges);
userRouter.put("/charges/:userId", protectUser, updateCharge);

userRouter.put("/graduation/:id", protectUser, addGraduation);

export default userRouter;
