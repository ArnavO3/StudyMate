import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI;

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }
  console.log("mongoURI",mongoURI)
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  isConnected = true;
  return mongoose.connection;
}
