import axios from "axios"

const API_URL =import.meta.env.VITE_API_URL || "http://localhost:8000/api";

console.log(API_URL );

const api = axios.create({
  baseURL: API_URL,
});

// recipe fetching routes
export const getRecipe = (ingredients)=>{
    console.log(ingredients)
    return api.post("/recipes/match",ingredients)
}

// fetching recipeS
export const getResultRecipe = (id)=>{
  return api.get(`/recipes/${id}`)
}
export const getDietary = ( dietary)=>{
  console.log(dietary)
  return api.post("/recipes/dietary",{ dietary})
}

export const getImageRecipe = (formData)=>{  
  // console.log(formData)
  
            for (let pair of formData.entries()) {
  console.log(pair[0] + ': ' + pair[1]);
}
  return api.post("/recipes/match-detection",formData,{
  headers:{"Content-Type" : "multipart/form-data",

  },
})
}



//
export const giveRating = (rating,recipeId)=>{
  // console.log(rating,id)
return api.post(`/users/ratings`, {rating,recipeId} )
}