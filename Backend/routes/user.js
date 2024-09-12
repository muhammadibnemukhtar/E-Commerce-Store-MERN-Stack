const express = require("express");
const userRouter = express.Router();
const {
  getAllUserHandle,
  newUserHandle,
  loginHandle,
} = require("../controllers/user");
const admin = require("../middlewares/authorization");

// User Route Get all User
userRouter.route("/").get(admin, getAllUserHandle);

// Signup
userRouter.route("/signup").post(newUserHandle);

// Login
userRouter.route("/login").post(loginHandle);

// Update User
userRouter.route("/:id").put();

// Delete User
userRouter.route("/:id").delete();

module.exports = userRouter;
