import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import  cheese from "../assets/CHEESE2.jpg"
import camera from "../assets/bigCameraLens.jpg"
import crocs from "../assets/crocs.jpg"




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
            name: "Croc boots",
            description: "when you wanna wrangle up the horses in comfort",
            price :  "$1200",
            img : crocs
        }
    ];

export default items

 