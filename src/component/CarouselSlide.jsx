import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import  cheese from "./CHEESE2.jpg"
import camera from "./bigCameraLens.jpg"





    const items = [
        {
            id : 1,
            name: "Cheese printer",
            description: "Check out this new fantastic thang!" ,
            price: "$32.99" ,
            img: cheese  
        },
        {
            id :2,
            name: "Large camera lens",
            description: "Hello World!",
            price : "$69,420",
            img : camera
        } ,
        {
            id :3,
            name: "Random Name #3",
            description: "Hello World!"
        }
    ];

export default items

 