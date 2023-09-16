const express = require("express");
const { connectionDB } = require("./Config/db");
const {userRouter} = require("./Router/User.Routes")
const {carsRouter} = require("./Router/Cars.Routes") 
const {authentication} = require("./Middleware/authentication")
const cors = require("cors");
const { AdminRouter } = require("./Router/Admin.Routes");
const { AdminAuthRouter } = require("./Router/Admin.Auth");
const { Adminauthentication } = require("./Middleware/adminAuthentication");

require("dotenv").config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the Application");
});

app.use("/adminLogin", AdminAuthRouter);
app.use("/users", userRouter);
app.use("/admin", Adminauthentication, AdminRouter);
app.use(authentication);
app.use("/cars", authentication, carsRouter)
app.listen(process.env.port, () => {
  connectionDB();
  console.log(`Server listening on port ${process.env.port}`);
});