import { useState } from 'react'
import './App.css'
import ResponsiveAppBar from './component/NavBar' 
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import Example from './component/CarouselSlide'


function App() {
  const [count, setCount] = useState(0)

  return (
  <div> 
  <ResponsiveAppBar/> 
  <div className = "Carousel">

  <Example/>
  </div>



  </div>
 )
}



export default App
