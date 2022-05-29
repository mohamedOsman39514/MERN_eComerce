import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = () =>
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connection Done"))
    .catch((err) => console.log(err));

export default connectDB;
