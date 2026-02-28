import mongoose from "mongoose";
import "dotenv/config";
const url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected!");
  } catch (err) {
    console.log("Error: ", err.message);
    process.exit(1);
  }
};

export default connectDB;
