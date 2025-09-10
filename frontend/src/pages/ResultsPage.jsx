import React from 'react'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const ResultsPage = () => {
const navigate = useNavigate()
  const {state} = useLocation();
  console.log(state)
  const recipes = state?.recipes || []
  console.log(recipes)
  
  const handleRecipe = (id)=>{
    navigate(`/recipe/${id}`);

  }

  if (recipes.length === 0) return <h2>No recipes found</h2>;
  return (
<>
<Typography variant="h4" p={4} color="initial">
  Results
</Typography>
  <Stack spacing={3} direction="row"   flexWrap="wrap"
  justifyContent="center"
 sx={{"height":"80vh"}}>


{recipes && recipes.map((recipe, index) => (
  <Card key={index} sx={{ maxWidth: 345, mb: 3, ml: 2 ,mt:3}}>
    <CardHeader
    sx={{ fontWeight: 'bold' }}
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          {recipe.title ? recipe.title[0] : "R"}
        </Avatar>
      }
      action={
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title={`Title : ${recipe.title}` || "Untitled Recipe"}
      subheader={`Cuisine: ${recipe.cusine}` || "Unknown Cuisine"}
    />

    <CardMedia
      component="img"
      height="194"
      image={recipe.image || "./italy.jpeg"}
      alt={recipe.title || "Recipe image"}
    />

    <CardContent>
      <Typography variant="body2" sx={{ color: "text.secondary" , fontWeight: 'bold' }}>
        {` Ease Of Making : ${recipe.difficulty }`||
          "This impressive dish is perfect for parties and fun to cook together!"}
         
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" , fontWeight: 'bold' }} >
 {

            `Total Ingredients :${recipe.totalIngredients}`

          }
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" , fontWeight: 'bold' }} >
 {

            `You Have Total Ingredients :${recipe.matchCount} Out of ${recipe.totalIngredients} `

          }
      </Typography>

<Typography  color="initial" pt={2}>
  <Button variant="outlined" size="medium" color="success" sx={{borderColor:"green"}} pt={3} onClick={()=>handleRecipe(recipe.id)}>
                  Go To Recipe    <ArrowForwardIcon/>
                    </Button>
</Typography>
                   

    </CardContent>

   
  </Card>
))}

      </Stack>
  
  
</>)
}

export default ResultsPage



