import mongoose from "mongoose";
let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  // If the database is already connected then dont connect again

  if (connected) {
    return;
  }
  // connect to DB
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
  } catch (error) {
    console.log(error);
  }
  console.log(`MongoDB connected? : ${connected}`);
};

export default connectDB;
