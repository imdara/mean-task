import { Schema } from "mongoose";

const messageSchema = new Schema({
  from: String,
  to: String,
  content: String,
  time: String,
});

export default mongoose.model("Message", messageSchema);
