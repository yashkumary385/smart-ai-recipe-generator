import express from "express";
import axios from "axios";
import fs from "fs";
import { upload } from "../middleware/multer";
const router = express.Router();

// POST /api/ingredients/from-image
router.post("/image-detection", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    // Load image file into buffer
    const imageBuffer = fs.readFileSync(req.file.path);

    // Hugging Face Inference API request
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
      imageBuffer,
      {
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/octet-stream"
        },
      }
    );

    // Response example: [{ "label": "tomato", "score": 0.96 }, ...]
    const ingredients = response.data
      .filter(pred => pred.score > 0.3)   // keep only confident predictions
      .map(pred => pred.label.toLowerCase());

    res.json({ ingredients });

    // Cleanup temporary file
    fs.unlinkSync(req.file.path);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Ingredient recognition failed" });
  }
});

export default router;
