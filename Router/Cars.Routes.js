const { Router } = require("express");
const { CarsModel } = require("../Models/Cars.Model");
const jwt = require("jsonwebtoken");
const carsRouter = Router();

carsRouter.get("/", async (req, res) => {
  // const token = req.headers.authorization;
  // const decoded = jwt.verify(token, "masai");
  // const id = decoded.userID;
  const cars = await CarsModel.find();
  // console.log(data)
  try {
    // const cars = await CarsModel.find({ userID: id });
    res.status(200).send( {cars} );
  } catch (error) {
    res
      .status(200)
      .send({ message: "Cannot get the car", error: error.message });
  }
});

carsRouter.post("/create", async (req, res) => {
  const payload = req.body;

  try {
    const cars = new CarsModel(payload);
   await cars.save();
    res.status(200).send({ message: "Car created successfully" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Cannot create Car", error: error.message });
  }
});

carsRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await CarsModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ message: `Car with id:${id} is Deleted` });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Cannot Delete Car", error: error.message });
  }
});

carsRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    await CarsModel.findByIdAndUpdate({ _id: id }, payload);
    res.status(200).send({ message: `Car with id:${id} is Updated` });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Cannot Update Car", error: error.message });
  }
});

module.exports = {
  carsRouter,
};