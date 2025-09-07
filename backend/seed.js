import mongoose from "mongoose";
import dotenv from "dotenv";
import Recipe from "./models/Recipe.js";
dotenv.config();
const recipes =
  [
  {
    "title": "Vegetable Stir Fry",
    "ingredients": [
      { "name": "broccoli", "quantity": "1 cup" },
      { "name": "carrot", "quantity": "1/2 cup" },
      { "name": "soy sauce", "quantity": "2 tbsp" }
    ],
    "steps": [
      "Heat oil in a pan.",
      "Add vegetables and stir-fry for 5 minutes.",
      "Add soy sauce and cook for 2 more minutes."
    ],
    "cuisine": "Asian",
    "difficulty": "easy",
    "cookingTime": 15,
    "dietary": ["vegetarian", "vegan"],
    "nutrition": { "calories": 200, "protein": 8, "carbs": 30, "fat": 5 }
  },
  {
    "title": "Spaghetti Aglio e Olio",
    "ingredients": [
      { "name": "spaghetti", "quantity": "200g" },
      { "name": "garlic", "quantity": "4 cloves" },
      { "name": "olive oil", "quantity": "3 tbsp" }
    ],
    "steps": [
      "Cook pasta until al dente.",
      "Heat olive oil and sauté garlic.",
      "Mix pasta with garlic oil and serve."
    ],
    "cuisine": "Italian",
    "difficulty": "easy",
    "cookingTime": 20,
    "dietary": ["vegetarian"],
    "nutrition": { "calories": 400, "protein": 12, "carbs": 70, "fat": 10 }
  },
  {
    "title": "Chicken Tikka",
    "ingredients": [
      { "name": "chicken breast", "quantity": "500g" },
      { "name": "yogurt", "quantity": "1 cup" },
      { "name": "spices", "quantity": "2 tbsp" }
    ],
    "steps": [
      "Marinate chicken in yogurt and spices.",
      "Grill chicken until cooked.",
      "Serve with chutney."
    ],
    "cuisine": "Indian",
    "difficulty": "medium",
    "cookingTime": 30,
    "dietary": ["gluten-free"],
    "nutrition": { "calories": 350, "protein": 40, "carbs": 5, "fat": 18 }
  },
  {
    "title": "Avocado Toast",
    "ingredients": [
      { "name": "bread", "quantity": "2 slices" },
      { "name": "avocado", "quantity": "1" },
      { "name": "lemon juice", "quantity": "1 tsp" }
    ],
    "steps": [
      "Toast the bread.",
      "Mash avocado with lemon juice.",
      "Spread on toast and serve."
    ],
    "cuisine": "American",
    "difficulty": "easy",
    "cookingTime": 10,
    "dietary": ["vegan", "vegetarian"],
    "nutrition": { "calories": 250, "protein": 6, "carbs": 28, "fat": 12 }
  },
  {
    "title": "Beef Tacos",
    "ingredients": [
      { "name": "taco shells", "quantity": "6" },
      { "name": "ground beef", "quantity": "300g" },
      { "name": "cheese", "quantity": "1/2 cup" }
    ],
    "steps": [
      "Cook ground beef with spices.",
      "Fill taco shells with beef and toppings.",
      "Serve immediately."
    ],
    "cuisine": "Mexican",
    "difficulty": "easy",
    "cookingTime": 20,
    "dietary": [],
    "nutrition": { "calories": 450, "protein": 25, "carbs": 35, "fat": 20 }
  },
  {
    "title": "Greek Salad",
    "ingredients": [
      { "name": "cucumber", "quantity": "1 cup" },
      { "name": "feta cheese", "quantity": "1/2 cup" },
      { "name": "olives", "quantity": "1/4 cup" }
    ],
    "steps": [
      "Chop vegetables.",
      "Mix with feta and olives.",
      "Drizzle with olive oil and serve."
    ],
    "cuisine": "Greek",
    "difficulty": "easy",
    "cookingTime": 10,
    "dietary": ["vegetarian", "gluten-free"],
    "nutrition": { "calories": 220, "protein": 7, "carbs": 12, "fat": 16 }
  },
  {
    "title": "Shakshuka",
    "ingredients": [
      { "name": "eggs", "quantity": "4" },
      { "name": "tomato sauce", "quantity": "2 cups" },
      { "name": "onion", "quantity": "1" }
    ],
    "steps": [
      "Cook onions and tomato sauce.",
      "Crack eggs into sauce.",
      "Simmer until eggs are set."
    ],
    "cuisine": "Middle Eastern",
    "difficulty": "medium",
    "cookingTime": 25,
    "dietary": ["vegetarian", "gluten-free"],
    "nutrition": { "calories": 300, "protein": 15, "carbs": 20, "fat": 18 }
  },
  {
    "title": "Sushi Rolls",
    "ingredients": [
      { "name": "sushi rice", "quantity": "2 cups" },
      { "name": "nori sheets", "quantity": "4" },
      { "name": "salmon", "quantity": "200g" }
    ],
    "steps": [
      "Cook sushi rice.",
      "Place rice and salmon on nori sheet.",
      "Roll tightly and slice."
    ],
    "cuisine": "Japanese",
    "difficulty": "hard",
    "cookingTime": 40,
    "dietary": ["gluten-free"],
    "nutrition": { "calories": 380, "protein": 20, "carbs": 55, "fat": 8 }
  },
  {
    "title": "Falafel Wrap",
    "ingredients": [
      { "name": "falafel", "quantity": "4 pieces" },
      { "name": "pita bread", "quantity": "1" },
      { "name": "tahini sauce", "quantity": "2 tbsp" }
    ],
    "steps": [
      "Warm pita bread.",
      "Add falafel and vegetables.",
      "Drizzle with tahini and wrap."
    ],
    "cuisine": "Middle Eastern",
    "difficulty": "easy",
    "cookingTime": 15,
    "dietary": ["vegan", "vegetarian"],
    "nutrition": { "calories": 330, "protein": 12, "carbs": 45, "fat": 10 }
  },
  {
    "title": "Pad Thai",
    "ingredients": [
      { "name": "rice noodles", "quantity": "200g" },
      { "name": "shrimp", "quantity": "150g" },
      { "name": "peanuts", "quantity": "2 tbsp" }
    ],
    "steps": [
      "Cook rice noodles.",
      "Stir-fry shrimp with vegetables.",
      "Add noodles, sauce, and peanuts."
    ],
    "cuisine": "Thai",
    "difficulty": "medium",
    "cookingTime": 30,
    "dietary": [],
    "nutrition": { "calories": 450, "protein": 20, "carbs": 60, "fat": 15 }
  },
  {
    "title": "Pancakes",
    "ingredients": [
      { "name": "flour", "quantity": "1 cup" },
      { "name": "milk", "quantity": "1 cup" },
      { "name": "egg", "quantity": "1" }
    ],
    "steps": [
      "Mix flour, milk, and egg.",
      "Cook batter on skillet.",
      "Serve with syrup."
    ],
    "cuisine": "American",
    "difficulty": "easy",
    "cookingTime": 20,
    "dietary": ["vegetarian"],
    "nutrition": { "calories": 300, "protein": 8, "carbs": 45, "fat": 8 }
  },
  {
    "title": "Lentil Soup",
    "ingredients": [
      { "name": "lentils", "quantity": "1 cup" },
      { "name": "onion", "quantity": "1" },
      { "name": "carrot", "quantity": "1" }
    ],
    "steps": [
      "Cook lentils with vegetables and spices.",
      "Simmer until soft.",
      "Blend if desired."
    ],
    "cuisine": "Mediterranean",
    "difficulty": "easy",
    "cookingTime": 40,
    "dietary": ["vegan", "vegetarian", "gluten-free"],
    "nutrition": { "calories": 250, "protein": 12, "carbs": 40, "fat": 5 }
  },
  {
    "title": "Butter Chicken",
    "ingredients": [
      { "name": "chicken", "quantity": "500g" },
      { "name": "butter", "quantity": "3 tbsp" },
      { "name": "cream", "quantity": "1/2 cup" }
    ],
    "steps": [
      "Cook chicken with spices.",
      "Add butter, tomato sauce, and cream.",
      "Simmer until rich."
    ],
    "cuisine": "Indian",
    "difficulty": "medium",
    "cookingTime": 45,
    "dietary": ["gluten-free"],
    "nutrition": { "calories": 500, "protein": 35, "carbs": 10, "fat": 35 }
  },
  {
    "title": "Caesar Salad",
    "ingredients": [
      { "name": "romaine lettuce", "quantity": "2 cups" },
      { "name": "croutons", "quantity": "1/2 cup" },
      { "name": "parmesan", "quantity": "1/4 cup" }
    ],
    "steps": [
      "Chop lettuce.",
      "Add croutons and parmesan.",
      "Toss with dressing."
    ],
    "cuisine": "Italian",
    "difficulty": "easy",
    "cookingTime": 10,
    "dietary": ["vegetarian"],
    "nutrition": { "calories": 200, "protein": 6, "carbs": 15, "fat": 12 }
  },
  {
    "title": "Ratatouille",
    "ingredients": [
      { "name": "eggplant", "quantity": "1 cup" },
      { "name": "zucchini", "quantity": "1 cup" },
      { "name": "tomato", "quantity": "1 cup" }
    ],
    "steps": [
      "Slice vegetables.",
      "Layer and bake with herbs.",
      "Serve warm."
    ],
    "cuisine": "French",
    "difficulty": "medium",
    "cookingTime": 50,
    "dietary": ["vegan", "vegetarian", "gluten-free"],
    "nutrition": { "calories": 180, "protein": 5, "carbs": 25, "fat": 6 }
  },
  {
    "title": "Pho",
    "ingredients": [
      { "name": "rice noodles", "quantity": "200g" },
      { "name": "beef", "quantity": "200g" },
      { "name": "broth", "quantity": "4 cups" }
    ],
    "steps": [
      "Prepare broth with spices.",
      "Cook noodles separately.",
      "Assemble with beef and broth."
    ],
    "cuisine": "Vietnamese",
    "difficulty": "hard",
    "cookingTime": 60,
    "dietary": [],
    "nutrition": { "calories": 420, "protein": 25, "carbs": 55, "fat": 12 }
  },
  {
    "title": "Hummus",
    "ingredients": [
      { "name": "chickpeas", "quantity": "1 can" },
      { "name": "tahini", "quantity": "2 tbsp" },
      { "name": "lemon juice", "quantity": "2 tbsp" }
    ],
    "steps": [
      "Blend chickpeas, tahini, and lemon.",
      "Add garlic and olive oil.",
      "Serve with pita."
    ],
    "cuisine": "Middle Eastern",
    "difficulty": "easy",
    "cookingTime": 10,
    "dietary": ["vegan", "vegetarian", "gluten-free"],
    "nutrition": { "calories": 220, "protein": 8, "carbs": 25, "fat": 10 }
  },
  {
    "title": "Chili Con Carne",
    "ingredients": [
      { "name": "ground beef", "quantity": "500g" },
      { "name": "beans", "quantity": "1 can" },
      { "name": "tomato sauce", "quantity": "2 cups" }
    ],
    "steps": [
      "Cook beef with onions.",
      "Add beans and tomato sauce.",
      "Simmer until thick."
    ],
    "cuisine": "Mexican",
    "difficulty": "medium",
    "cookingTime": 50,
    "dietary": ["gluten-free"],
    "nutrition": { "calories": 480, "protein": 30, "carbs": 35, "fat": 20 }
  },
  {
    "title": "Miso Soup",
    "ingredients": [
      { "name": "miso paste", "quantity": "2 tbsp" },
      { "name": "tofu", "quantity": "1/2 cup" },
      { "name": "seaweed", "quantity": "1/4 cup" }
    ],
    "steps": [
      "Heat water and dissolve miso paste.",
      "Add tofu and seaweed.",
      "Simmer briefly and serve."
    ],
    "cuisine": "Japanese",
    "difficulty": "easy",
    "cookingTime": 15,
    "dietary": ["vegan", "vegetarian", "gluten-free"],
    "nutrition": { "calories": 120, "protein": 8, "carbs": 10, "fat": 4 }
  },
  {
    "title": "Quinoa Salad",
    "ingredients": [
      { "name": "quinoa", "quantity": "1 cup" },
      { "name": "cherry tomatoes", "quantity": "1 cup" },
      { "name": "cucumber", "quantity": "1/2 cup" }
    ],
    "steps": [
      "Cook quinoa.",
      "Mix with chopped vegetables.",
      "Drizzle with lemon dressing."
    ],
    "cuisine": "Mediterranean",
    "difficulty": "easy",
    "cookingTime": 25,
    "dietary": ["vegan", "vegetarian", "gluten-free"],
    "nutrition": { "calories": 280, "protein": 10, "carbs": 40, "fat": 8 }
  }
]



const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected for seeding");

    await Recipe.deleteMany({});
    await Recipe.insertMany(recipes);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
