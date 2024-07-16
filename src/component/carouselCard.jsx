import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'


const background = {
    backgroundColor : "#a1a1aa"
  }

 const Cards = ({ name , img , price ,description}) =>{
    return (
        <div style={background}>
            <Paper>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{price}</p>
            <img src={img}  style={{ width: '50%', height: 'auto' , maxHeight:"400px" , backgroundColor : "#a1a1aa"}} />
            </Paper>
        </div>
    )
}

export default Cards 