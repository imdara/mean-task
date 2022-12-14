import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  content: String,
  time: String,
});

export default mongoose.model("Message", messageSchema);
