import { useState } from 'react'
import './App.css'
import ResponsiveAppBar from './component/NavBar' 
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Card , CardContent } from '@mui/material'
import items from './component/CarouselSlide'
import Cards from "./component/carouselCard"

function App() {
  const [count, setCount] = useState(0)


  const containerStyle = {
    width: '100vw', // Full viewport width
    maxWidth: '100%', // Ensure it does not exceed 100%
    margin: '0', // Remove any default margin
    padding: '0', // Remove any default padding    
    height: '47vw', // Level slide in right position 
};


function createCard(item){
  return(<Cards
  key={item.id}
  name={item.name}
  description={item.description}
  price={item.price}
  img={item.img}
  />)
}


  return (
  <div> 
  <ResponsiveAppBar/> 
  <div style={containerStyle}>
  <Carousel>
{items.map(createCard)}
  </Carousel>
</div>


  </div>
 )
}



export default App
