import express from "express";
import Recipe from "../models/Recipe.js";
import dotenv from "dotenv";
import { upload } from "../middlewares/multer.js";
import fs from "fs"
import axios from "axios";

dotenv.config();

const router = express.Router();

// Get all recipes (with optional filters)
router.get("/", async (req, res) => {
    try {
        const { difficulty, dietary, maxTime } = req.query; // if query are present then only 
        let filter = {};

        if (difficulty) filter.difficulty = difficulty; // adding the required attributes in order to filter the recipes
        if (dietary) filter.dietary = { $in: [dietary] };
        if (maxTime) filter.cookingTime = { $lte: Number(maxTime) };

        const recipes = await Recipe.find(filter);
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Get recipe by ID
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) return res.status(404).json({ error: "Recipe not found" });
        res.json(recipe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.post("/match-detection", upload.single("image"), async (req, res) => {
  console.log("hittt")
  console.log(req.file)
  let imagePath = null;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    imagePath = req.file.path;
    console.log(imagePath)
    const imageBuffer = fs.readFileSync(imagePath);

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
      imageBuffer,
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/octet-stream",
        },
      }
    );

    const ingredients = response.data
      .filter((pred) => pred.score > 0.3)
      .map((pred) => pred.label.toLowerCase());

      console.log(ingredients,"thi sis inge")
    if (!ingredients || ingredients.length === 0) {
      return res
        .status(404)
        .json({ message: "Provide the ingredients required to fetch recipes" });
    }

    const recipes = await Recipe.find({});
    const matches = recipes.map((recipe) => {
      const recipeIngredients = recipe.ingredients.map((i) =>
        i.name.toLowerCase()
      );
      const matchCount = recipeIngredients.filter((ingredient) =>
        ingredients.includes(ingredient)
      ).length;

      return { recipe, matchCount };
    });

    const filteredMatches = matches
      .filter((match) => match.matchCount > 0)
      .sort((a, b) => b.matchCount - a.matchCount);

    res.status(200).json(
      filteredMatches.map((m) => ({
        id: m.recipe._id,
        title: m.recipe.title,
        cuisine: m.recipe.cuisine,
        difficulty: m.recipe.difficulty,
        cookingTime: m.recipe.cookingTime,
        matchCount: m.matchCount,
        totalIngredients: m.recipe.ingredients.length,
        matchPercentage:
          (m.matchCount / m.recipe.ingredients.length) * 100,
        ingredients: m.recipe.ingredients,
      }))
    );
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Ingredient recognition failed" });
  } finally {
    if (imagePath) fs.unlinkSync(imagePath);
  }
});

// get the recipe that we clicked we get much larger payload from here we gets the whole recipe payload 
// can be removed later on beacuse it is replicated
router.get("/:id", async (req, res) => {
   const {id} = req.params.id;
    try {
         const recipe = await Recipe.findById(id);
    res.status(200).json(recipe)
    } catch (error) {
            res.status(500).json({ error: err.message });
    }
})

router.post("/match",async(req,res)=>{
  try {
    console.log('match route hiitt');
    
      const ingredients = req.body;// eg ["bread","egg","yogurt"]
           console.log(ingredients);
           console.log(req.body)
           
    
    if (!ingredients || ingredients.length == 0) {
        res.status(404).json({ message: "Provide the ingredients required to fetch recipes" });
    }
         const recipes = await Recipe.find({});
    const matches = recipes.map(recipe => { /// we take out all the recipe ingredinets from the recipes 
        const recipeIngredients = recipe.ingredients.map(i => i.name.toLowerCase())
        const matchCount = recipeIngredients.filter(ingredient => ingredients.includes(ingredient.toLowerCase())).length;
        return { recipe, matchCount }; // the recipe we wanted and the number of the matched ingredient there were they form the array 
    })
    // console.log(matches,"this is matches");
    

    const filteredMatches = matches.filter(match => match.matchCount > 0);
console.log(filteredMatches);

    filteredMatches.sort((a, b) => b.matchCount - a.matchCount) // sorting our matches array 

    res.status(200).json(filteredMatches.map(m => ({
        id: m.recipe._id,
        title: m.recipe.title,
        cusine: m.recipe.cuisine,
        difficulty: m.recipe.difficulty,
        cookingTime: m.recipe.cookingTime,
        matchCount: m.matchCount,
        totalIngredients: m.recipe.ingredients.length,
        ingerdients:m.recipe.ingredients
    })))
    } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err });
  }
  
   


})


router.post("/dietary",async(req,res)=>{
  console.log("dietary route hitt");
  try {
      const {dietary} = req.body;
      console.log(dietary);
   if(dietary.length==0){
    return res.status(400).json({error:"Please provide the dietary filter"})
   }
   const recipes = await Recipe.find({});
   const matches = recipes.map((recipe)=>{
    const dietaryName = recipe.dietary.map((die)=>{
     return die.toLowerCase();
    })
    // console.log(dietaryName);
    const match = dietaryName.filter((name )=> dietary.includes(name.toLowerCase())).length
    return {recipe,match}
   })
// console.log(matches);

const filteredMatches = matches.filter(match=>match.match>0);
// console.log(filteredMatches);

   res.status(200).json(filteredMatches.map(m => ({
        id: m.recipe._id,
        title: m.recipe.title,
        cusine: m.recipe.cuisine,
        difficulty: m.recipe.difficulty,
        cookingTime: m.recipe.cookingTime,
        matchCount: m.matchCount,
        totalIngredients: m.recipe.ingredients.length,
        ingerdients:m.recipe.ingredients
    })))
  } catch (error) {
    res.status(400).json(error)
  }

})

export default router