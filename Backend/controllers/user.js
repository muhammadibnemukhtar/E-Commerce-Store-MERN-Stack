require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

// Get All Users
const getAllUserHandle = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Create New User
const newUserHandle = async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = await new User(user);
    await newUser.save();
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

// Login
const loginHandle = async (req, res) => {
  const { email, password } = req.body;
  //   console.log(email, password);
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.isAdmin) {
        const token = JWT.sign(
          { email: user.email, id: user.id, name: user.name },
          process.env.JWT_ADMIN_SECRET
        );
        return res.status(200).send(token);
      } else {
        const token = JWT.sign(
          { email: user.email, id: user.id, name: user.name },
          process.env.JWT_SECRET
        );
        return res.status(200).send(token);
      }
    } else {
      return res.status(401).send("Invalid Email or Password");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAllUserHandle, newUserHandle, loginHandle };
