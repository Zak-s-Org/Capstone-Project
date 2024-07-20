import { useState } from "react";
import "./App.css";
import ResponsiveAppBar from "./component/NavBar";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Card, CardContent } from "@mui/material";
import items from "./component/CarouselSlide";
import Cards from "./component/carouselCard";
import Products from "./component/items";
import Login from "./component/login";
import DarkThemedLogin from "./pages/LoginPage";


function App() {
  


  const containerStyle = {
    width: "100vw", // Full viewport width
    maxWidth: "100%", // Ensure it does not exceed 100%
    margin: "0", // Remove any default margin
    padding: "0", // Remove any default padding
    height: "47vw", // Level slide in right position
  };

  function createCard(item) {
    return (
      <Cards
        key={item.id}
        name={item.name}
        description={item.description}
        price={item.price}
        img={item.img}
      />
    );
  }

  const background = {
    backgroundColor: "#a1a1aa"
  };

  return (
    <div className="wrapped">
    <div className="navbar">
      <ResponsiveAppBar />
      
      </div>
      <div style={containerStyle}>
        <Carousel>{items.map(createCard)}</Carousel>
      </div>
      <br></br>
      <Products />
       {/* Add the new DarkThemedLogin component */}
    </div>
  );
}

export default App;