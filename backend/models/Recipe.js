import mongoose from "mongoose";

const nutritionSchema = new mongoose.Schema({
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
});

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ name: String, quantity: String }],
  steps: [String], // array of the steps required to do this 
  cuisine: String,
  difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
  cookingTime: Number, // in minutes
  dietary: [String], // e.g. ["vegetarian", "gluten-free"]
  nutrition: nutritionSchema,
  ratings: [{ userId: String, rating: Number }],
});

export default mongoose.model("Recipe", recipeSchema);
