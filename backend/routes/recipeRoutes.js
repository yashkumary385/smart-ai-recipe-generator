import express from "express";
import Recipe from "../models/Recipe.js";

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



router.post("/match", async (req, res) => {
    const { ingredients } = req.body;// eg ["bread","egg","yogurt"]
    console.log(req.body);
    
    if (!ingredients || ingredients.length == 0) {
        res.status(404).json({ message: "Provie the ingredients required to fetch recipes" });
    }
    try {
         const recipes = await Recipe.find({});
    const matches = recipes.map(recipe => { /// we take out all the recipe ingredinets from the recipes 
        const recipeIngredients = recipe.ingredients.map(i => i.name.toLowerCase())
        const matchCount = recipeIngredients.filter(ingredient => ingredients.includes(ingredient.toLowerCase())).length;
        return { recipe, matchCount }; // the recipe we wanted and the number of the matched ingredient there were they form the array 
    })
    console.log(matches,"this is matches");
    

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
    })))
    } catch (error) {
            res.status(500).json({ error: err.message });
    }
})

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



export default router