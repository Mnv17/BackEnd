const mongoose = require("mongoose");

const carsSchema = mongoose.Schema(
  {
    image: {type: String, required: true},
    title: { type: String, required: true },
    description: { type: Array, required: true },
    price: { type: Number, required: true },
    colors: { type: String, required: true },
    mileage: { type: Number, required: true },
    userID: { type: String },
  },
  {
    versionKey: false,
  }
);

const CarsModel = mongoose.model("car", carsSchema);

module.exports = {
    CarsModel,
};