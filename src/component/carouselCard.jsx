import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

 const Cards = ({ name , img , price ,description}) =>{
    return (
        <div>
            <Paper>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{price}</p>
            <img src={img}  style={{ width: '50%', height: 'auto' }} />
            </Paper>
        </div>
    )
}

export default Cards 