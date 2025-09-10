import React, { useEffect, useState } from 'react'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom';
import { getResultRecipe,giveRating } from '../api';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';


// const card = (

// );
export const RecipePage = () => {
  
const [rating ,setRating] = useState("")
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const { id } = useParams()
    useEffect(() => {
        const handleRecipe = async () => {
            try {
                const res = await getResultRecipe(id);
                console.log(res)
                setRecipe(res.data)
                setIngredients(res.data.ingredients || [])
            } catch (error) {
                console.log(error)
            }
        }
        handleRecipe()
    }, [])

const handleRating =async (id)=>{
  console.log(id)
  try {
    const res = await giveRating(rating,id)
    console.log(res);
    toast.success("Rating Given")
  } catch (error) {
    console.log(error)
    toast.error(error.response.data)
  }
}






    return (
        <Stack spacing={3} direction="row" flexWrap="wrap"
            justifyContent="center" alignItems="center"
            sx={{ "height": "80vh" }}>


            <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
           <CardContent>
  <Typography gutterBottom sx={{ color: "text.secondary", fontSize: 14 }}>
    Cuisine: {recipe?.cuisine}
  </Typography>

  <Typography variant="h5" component="div">
    {recipe?.title}
  </Typography>

  <Typography sx={{ color: "text.secondary", mb: 1.5 }} pt={2}>
    Ingredients:
  </Typography>
  <Box>
    {ingredients.length > 0 ? (
      ingredients.map((ing, index) => (
        <Typography key={ing._id || index} variant="body2">
          • {ing.name} – {ing.quantity}
        </Typography>
      ))
    ) : (
      <Typography variant="body2" color="text.secondary">
        Loading ingredients...
      </Typography>
    )}
  </Box>
  <Typography sx={{ color: "text.secondary", mb: 1.5 }} pt={2}>
    Nutrition:
  </Typography>
<Box sx={{ mt: 2 }}>

  {recipe?.nutrition ? (
    Object.entries(recipe.nutrition)
      .filter(([key]) => key !== "_id") // 🔥 exclude _id
      .map(([key, value], index) => (
        <Typography key={index} variant="body2">
          • {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
        </Typography>
      ))
  ) : (
    <Typography variant="body2" color="text.secondary">
      Loading nutrition...
    </Typography>
  )}
</Box>



  <Typography sx={{ color: "text.secondary", mt: 2 }}>
    Steps:
  </Typography>
  <Box>
    {recipe?.steps && recipe.steps.length > 0 ? (
      recipe.steps.map((step, index) => (
        <Typography key={index} variant="body2">
          {index + 1}. {step}
        </Typography>
      ))
    ) : (
      <Typography variant="body2" color="text.secondary">
        Loading steps...
      </Typography>
    )}
  </Box>

  <TextField id="outlined-basic" label="Feedback" variant="outlined"   sx={{ mt: 3 }} onChange={(e)=> setRating(e.target.value)}  />
</CardContent>
    <Button variant="outlined" onClick={()=>handleRating(recipe._id)}>Give rating</Button>
      <Typography variant="body2" color="initial">
        Ratings: {recipe?.ratings.map(r => r.rating).join(", ") || "No ratings yet."}
      </Typography>

                </Card>

            </Box>

        </Stack>
    )
}

