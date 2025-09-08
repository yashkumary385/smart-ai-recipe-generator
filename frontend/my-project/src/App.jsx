import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  Link,
} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import HomePage from "./pages/HomePage.jsx";
import ResultsPage from "./pages/ResultsPage";
import {RecipePage} from "./pages/RecipePage";

// Layout wraps navbar + shared UI
function Layout() {
  return (
    <>
     
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#4CAF50" }}   style={{color:"black"}}// Material green 500
 // Purple 800
>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
            <SoupKitchenIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Smart Recipe Generator
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
      <Outlet />

    </>
  );
}


  export const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage/>} />
        <Route path="/recipe/:id" element={<RecipePage />} /> 
      </Route>
    )
  );
// export  router



