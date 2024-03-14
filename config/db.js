const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB connected ${conn.connection.host}`);
  } catch (err) {
    console.log(`Something wrong! ${err}`);
  }
};

module.exports = connectDB;
