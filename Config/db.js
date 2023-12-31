const mongoose = require("mongoose");
require("dotenv").config();

const connectionDB = async () => {
  await mongoose.connect(process.env.MongoUrl);
  console.log("Connected to DB");
};

module.exports = {
  connectionDB,
};