import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If already connected, return early
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Optional: add more options here if needed
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", {
      message: error.message,
      stack: error.stack,
    });
    // Optionally, you could throw the error or handle it in some way
    // throw new Error('Database connection failed');
  }

  // Optional: handle disconnection
  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
    isConnected = false;
  });

  // Optional: handle errors
  mongoose.connection.on("error", (error) => {
    console.error("MongoDB connection error:", {
      message: error.message,
      stack: error.stack,
    });
  });
};

export default connectDB;
