import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
  isDisabled: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
