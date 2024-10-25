import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

let isConnected = false; // Track the connection state

export async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  await mongoose.connect(mongoURI);
  isConnected = true;
  return mongoose.connection;
}
