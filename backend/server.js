import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import imageRoutes from './routes/imageDetectionRoutes.js'

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.development" });
}




const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// recipes routes
app.use("/api/recipes",recipeRoutes)

// user routes
app.use("/api/users",userRoutes)
// image routes 
app.use("/api/images",imageRoutes)

console.log(process.env.MONGODB_URI);

app.get("/",(req,res)=>{
  res.send("hiiiii")
})
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes placeholder
app.get("/", (req, res) => {
  res.send("Smart Recipe Generator API running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
