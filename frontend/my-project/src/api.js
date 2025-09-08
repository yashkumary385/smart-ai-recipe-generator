import axios from "axios"

const API_URL =import.meta.env.VITE_API_URL || "http://localhost:8000/api";

console.log(API_URL );

const api = axios.create({
  baseURL: API_URL,
});

// recipe fetching routes
export const getRecipe = (ingredients)=>{
    // console.log(ingre)
    return api.post("/recipes/match",ingredients)
}

// fetching recipeS
export const getResultRecipe = (id)=>{
  return api.get(`/recipes/${id}`)
}