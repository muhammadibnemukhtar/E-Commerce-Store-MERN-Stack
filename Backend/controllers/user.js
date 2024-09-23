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
    const existingUser = User.find({email: user.email,name: user.name});
    if (existingUser){
      return res.status(409).send("Email or Username already exist!");
    }
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
          {
            email: user.email,
            id: user.id,
            name: user.name,
            admin: user.isAdmin,
          },
          process.env.JWT_ADMIN_SECRET
        );
        return res.status(200).send(token);
      } else {
        const token = JWT.sign(
          {
            email: user.email,
            id: user.id,
            name: user.name,
            admin: user.isAdmin,
          },
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


const tokenLoginHandle = async (req, res) => {
  const token = req.header("x-auth-token");
  console.log(token);
  try {
    const varified = JWT.verify(token, process.env.JWT_ADMIN_SECRET)
    console.log(varified);
    const user = await User.findById(varified.id);
    console.log(user);
    if (user) {
      return res.status(200).send(token);
    } else {
      return res.status(404).send("User not found");
    }
  }
  catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getAllUserHandle, newUserHandle, loginHandle, tokenLoginHandle };
