import Like from "./like.schema.js";

export const likeRepo = async (user_id, likeable_id, on_model) => {
  const newLike = new Like({
    user: user_id,
    likeable: likeable_id,
    on_model: on_model,
  });
  return await newLike.save();
};

export const getLikesRepo = async (id, on_model) => {
  return await Like.find({ likeable: id, on_model: on_model }).populate("user");
};
