const { Router } = require("express");

const userRouter = Router();
const { UserModel } = require("../Models/User.Model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// To get ALL data
userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send({ userDetails: users });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

// Register
userRouter.post("/signup", async (req, res) => {
  const {  email, password } = req.body;

  try {
    
   
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err)
        return res
          .status(400)
          .send({ message: "Cannot Register User", error: err });
      else {
        const user = new UserModel({  email, password: hash });
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
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });

    if (user && user.length !== 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          res.status(200).send({
            message: "Login Successful",
            token: jwt.sign({ userID: user[0]._id }, "masai"),
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
  userRouter,
};