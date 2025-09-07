import express from "express"
import User from "../models/User.js";
import Recipe from "../models/Recipe.js";
const router = express.Router();


router.post("/register",async(req,res)=>{
    console.log("hitttt")
    try {
           const {name,email,prefrences} = req.body;
    if(!name || !email || !prefrences){
        res.status(404).json("all the fields are necessary ")
    }
    const user = await User.create({
        name:name,
        email:email,
        prefrences:prefrences
    })
    return res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error)
    }
 
})



router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("favorites");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




router.post("/:id/favourites",async(req,res)=>{

    try {
          const {recipeId} = req.body;

    // const user = await User.findById(req.params.id);
    // if(!user.favorites.includes(recipeId)){
    //     user.favorites.push(recipeId)
    //     await user.save()
    // }
    const user = await User.findByIdAndUpdate(req.params.id, // pushing the recipe id in the user favourites
{$push: {favourites :recipeId}}
    );
    res.json(user)
    } catch (error) {
        res.status(404).json(error)
    }

})


router.post("/:id/ratings",async(req,res)=>{
    try {
        const {id} = req.params.id;
          const {recipeId , rating} = req.body;
            if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }
        const recipe = await Recipe.findById(recipeId);
           if (!recipe) return res.status(404).json({ error: "Recipe not found" });
        if(!recipe.ratings.includes(id)){
        recipe.ratings.push({userId:id , rating:rating})
        await recipe.save();
        }

    } catch (error) {
        res.status(404).json(error)
        
    }
})




export default router;