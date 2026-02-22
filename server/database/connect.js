import mongoose from "mongoose";
const url = "mongodb://localhost:27017/notes_analytics_database";

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
