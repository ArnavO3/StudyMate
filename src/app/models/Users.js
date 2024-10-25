import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  pswd: String,
  student: Boolean,
  age: { type: Number, max: 75 },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;