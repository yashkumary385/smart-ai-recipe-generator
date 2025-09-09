import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getImageRecipe, getRecipe } from '../api.js';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDietary } from '../api.js';
import MenuItem from "@mui/material/MenuItem";

const HomePage = () => {
  const navigate = useNavigate()
  const [ingredients, setIngredients] = useState("");
  const [ingArray, setIngArray] = useState([])
  const [match, setMatch] = useState([]);
const[dietary, setDietary]  = useState("")
const [image, setImage] = useState(null)



const dietaryOptions = [
  
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },]

  const handleAdd = () => {
    try {
      const ingredient = ingredients;
      ingArray.push(ingredient);
      setIngredients("");
      toast.success("Ingredient added")
      // console.log(ingArray)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRecipe = async () => {
    try {
      const res = await getRecipe(ingArray)
      console.log(res)
      setMatch(res.data)
      navigate("/results", { state: { recipes: res.data } })


    } catch (error) {
      console.log(error)

    }
  }

  const handleDietary = async () => {
    try {
      const res = await getDietary(dietary)
      console.log(res)
      setMatch(res.data)
      navigate("/results", { state: { recipes: res.data } })
    } catch (error) {
      console.log(error)
    }
  }




  const handleImage = async () => {
try {
  const formData = new FormData();
  formData.append("image",image)
  console.log(image)
  const res = await getImageRecipe(formData)
  console.log(res);
  toast.success("Image uploaded successfully")
    navigate("/results", { state: { recipes: res.data } })

} catch (error) {
  // res.status(400).json(error)
  console.log(error)
}
  }

  return (
    <>
      <Stack spacing={3} alignItems="center" sx={{ "height": "100vh" }}>
        <Typography variant='h3' sx={{ pt: 5 }}> Smart Recipe Generator</Typography>
        <Typography variant='h5' sx={{ pt: 5 }}> Search With Ingredients</Typography>

        <Stack direction="row" spacing={2}>

          <TextField id="outlined-basic" label="Enter Ingredients" variant="outlined" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
          <Button variant="outlined" size="medium" sx={{ borderColor: "green" }} onClick={handleAdd}>
            <Typography variant="h7" color="success">Add</Typography>
          </Button>
        </Stack>
        <Typography variant="body2" color="initial">
          {ingArray.length > 0 ? `Added Ingredients: ${ingArray.join(", ")}` : "No ingredients added yet."}
        </Typography>
         <Button variant="outlined" size="medium" sx={{ borderColor: "green" }} onClick={handleRecipe}>
          <Typography variant="h7" color="success">Search</Typography>
        </Button>
        <Typography variant="h5" color="initial">
          Search By Dietary Preference
        </Typography>
<TextField
  id="outlined-select-dietary"
  select
  label="Select Dietary"
  value={dietary}
  onChange={(e) => setDietary(e.target.value)}
  helperText="Please select your dietary preference"
>
  {dietaryOptions.map((option) => (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  ))}
</TextField>

        <Button variant="outlined" size="medium" sx={{ borderColor: "green" }} onClick={handleDietary}>
          <Typography variant="h7" color="success">Search</Typography>
        </Button>
        <Typography variant="h5" color="initial">
          Search By Image
        </Typography>

        <Button variant="outlined" sx={{ borderColor: "green" }} component="label">
          <Typography variant="h7" color="success">Upload Ingredient Image</Typography>
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </Button>
          <Button variant="outlined" size="medium" sx={{ borderColor: "green" , mb:3}} onClick={handleImage}>
          <Typography variant="h7" color="success" >Search</Typography>
        </Button>
      </Stack>


    </>
  )
}

export default HomePage
