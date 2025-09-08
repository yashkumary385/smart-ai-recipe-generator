import axios from "axios"
const API_URL = import.meta.env.VITE_API_URL;
const api = axios.create({
  baseURL: API_URL,
});

// recipe fetching routes
export const getRecipe = (ingre)=>{
    console.log(ingre)
    return api.post("/recipes/match",ingre)
}