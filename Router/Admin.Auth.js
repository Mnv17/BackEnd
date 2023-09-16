const { Router } = require("express");
const AdminAuthRouter = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminModel } = require("../Models/Admin.Model");

// To get ALL data
AdminAuthRouter.get("/", async (req, res) => {
  try {
    const users = await adminModel.find();
    res.status(200).send({ userDetails: users });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Register
AdminAuthRouter.post("/signup", async (req, res) => {
  const {  email, password } = req.body;

  try {
    
   
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err)
        return res
          .status(400)
          .send({ message: "Cannot Register User", error: err });
      else {
        const user = new adminModel({  email, password: hash });
        await user.save();
        res.status(200).send({ message: "New User Register" });
      }
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Cannot Register The User", error: error.message });
  }
});

// Login
AdminAuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await adminModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          res.status(200).send({
            message: "Login Successful",
            token: jwt.sign({ userID: user._id }, "masai"),
          });
        } else {
          res.status(400).send({ message: "Wrong Password" });
        }
      });
    } else {
      res.status(404).send({ message: "User not found. Register First" });
    }
  } catch (error) {
    res.status(400).send({ message: "Cannot Login", error: error.message });
  }
});

module.exports = {
  AdminAuthRouter,
};