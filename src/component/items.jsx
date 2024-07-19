import { Paper, Grid, Typography, Button, Card, CardContent } from '@mui/material';
import bob from "./bob.jpg"
import roblox from "./shopping.webp"
import shirt from "./shirt.jpg"
import shirt2 from "./shirt2.jpg"
import Cards from './carouselCard';

const style = {
    textAlignCenter : "center"
}

const background = {
  backgroundColor: "#152128"
}


const product = [
  {
    id: 1,
    name: 'Shirt 2',
    description: "Kaboom!",
    price: '$300',
    img: shirt2,

  },
   {
    id: 2,
    name: 'Shirt',
    description: 'Silly couple shirt',
    price: '$250',
    img: shirt,
  },
  {
    id: 3,
    name: 'Bob',
    description: 'Hot summer fashion!',
    price: '$300',
    img: bob,
  },
  {
    id: 4,
    name: 'Roblox',
    description: 'Roblox...',
    price: '$200',
    img: roblox,
  },
];



export default function Products() {
  return (
    
    <div className="items">
      <div className='heading'>
        <h1>Limited edition items!</h1>
        <h2>Get them while they're hot!</h2>
      </div>
    <Grid container spacing={2}>
      <div className='products'>
      {product.map((product) => (
        <Grid item key={product.id} xs={6} md={4} lg={3}>
          <Cards 
            name={product.name}
            description={product.description}
            price={product.price}
            img={product.img}
          />
        </Grid>
       
      ))}
      </div>
    </Grid>
  </div>
  );
}
