# Smart AI Recipe Generator 🍳

A web application that suggests personalized recipes based on available ingredients using AI-powered image recognition and intelligent recipe matching algorithms.

## 🚀 Live Demo
[View Live Application](https://smart-ai-recipe-generator.onrender.com/)

## ✨ Features

### Core Functionality
- **AI Image Recognition**: Upload photos of ingredients using Hugging Face's vision models
- **Intelligent Recipe Matching**: Advanced algorithm matches available ingredients to suitable recipes
- **Multiple Input Methods**: Text input, ingredient selection, or photo upload

### Recipe Management
- **Comprehensive Database**: 20 curated recipes across various cuisines
- **Detailed Instructions**: Step-by-step cooking guides with prep/cook times
- **Nutritional Information**: Calories, protein, carbs, and dietary tags
- **Difficulty Ratings**: Easy, Medium, Hard classification

### Filtering & Customization
- **Dietary Preferences**: Vegetarian, vegan, gluten-free, dairy-free options

### User Experience
- **Mobile-First Design**: Fully responsive across all devices
- **Loading States**: Smooth UX with proper loading indicators
- **Error Handling**: Graceful error messages and fallback options
- **Intuitive Interface**: Clean, modern design with easy navigation

## 🛠️ Technology Stack

### Frontend
- **Framework**: React.js with hooks
- **Styling**: Material UI for Components
- **Image Processing**: Hugging Face Model API for image preprocessing

### AI/ML Integration
- **Model**: `google/vit-base-patch16-224` for ingredient classification

### Backend/Data
- **Recipe Database**: JSON-based Mongo DB

### Deployment
- **Hosting**: Render

## 🔧 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/smart-recipe-generator.git
cd smart-recipe-generator

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Environment Variables
```env
HF_API_KEY = your_api_token
VITE_API_URL = your_url
```

## 🧠 Technical Approach

### Image Recognition Pipeline
1. **Preprocessing**: Resize and normalize uploaded images
2. **Model Inference**: Use Hugging Face for ingredient classification

## 📊 Recipe Database Structure

```json
{
    "title": "Vegetable Stir Fry",
    "ingredients": [
      { "name": "broccoli", "quantity": "1 cup" },
      { "name": "carrot", "quantity": "1/2 cup" },
      { "name": "soy sauce", "quantity": "2 tbsp" }
    ],
    "steps": [
      "Heat oil in a pan.",
      "Add vegetables and stir-fry for 5 minutes.",
      "Add soy sauce and cook for 2 more minutes."
    ],
    "cuisine": "Asian",
    "difficulty": "easy",
    "cookingTime": 15,
    "dietary": ["vegetarian", "vegan"],
    "nutrition": { "calories": 200, "protein": 8, "carbs": 30, "fat": 5 }
  },
```


## 🚀 Deployment Guide

### Render Deployment
```bash
# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod --dir=build
```

### Environment Configuration
- Set up environment variables in hosting platform
- Configure build commands and publish directory
- Enable HTTPS and custom domain (optional)
- 
## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License

## 🙏 Acknowledgments

- **Hugging Face** for providing excellent ML models and APIs
- **React Community** for comprehensive documentation and tools
- **Recipe Data** sourced from public cooking websites and APIs
- **UI Inspiration** from modern cooking applications

## 📞 Contact

**Your Name**  
Email: yashkumary385@gmail.com  
LinkedIn: [yashkryadav](https://www.linkedin.com/in/yashkryadav)  
GitHub: [yashkumary385](https://github.com/yashkumary385)

---

*Built with ❤️ for the Smart Recipe Generator Technical Assessment*
