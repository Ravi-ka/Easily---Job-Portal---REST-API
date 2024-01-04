import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  on_model: {
    type: String,
    enum: ["User", "Job"],
    required: true,
  },
});

const Like = mongoose.model("Like", likeSchema);
export default Like;
