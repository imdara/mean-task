import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    from: String,
    to: String,
    content: String,
    flow: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);
