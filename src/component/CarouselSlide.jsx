import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';


const containerStyle = {
    width: '100vw', // Full viewport width
    maxWidth: '100%', // Ensure it does not exceed 100%
    margin: '0', // Remove any default margin
    padding: '0', // Remove any default padding    
    height: '47vw', // Level slide in right position 
};

export default function Example(props) {
    const items = [
        {
            name: "Featured Product 1",
            description: "Check out this new a fantastic thang!" , 
            img: '' , 
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ];

    return (
        <div style={containerStyle}>
            <Carousel>
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
        </div>
    );
}

function Item(props) {
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>
            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    );
}
