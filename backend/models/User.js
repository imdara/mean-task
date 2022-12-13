import { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
