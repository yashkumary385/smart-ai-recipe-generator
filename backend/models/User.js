import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  preferences: [String], // ["vegetarian", "vegan"]
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});

export default mongoose.model("User", userSchema);
