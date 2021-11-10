import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import accounting from 'accounting';
import {createTheme, responsiveFontSizes, ThemeProvider,} from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import {useStateValue} from '../StateProvider';
import {actionTypes} from '../reducer'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button} from '@mui/material';

import { CardActionArea } from '@mui/material';

let theme = createTheme(); 
theme = responsiveFontSizes(theme);

export default function BuyCart({product:{
id,
name,
price,
currency,
img,
details,
bestseller,
category,
featured,
rating,
height,
width
}
}) {
  
const [{basket},dispatch] = useStateValue();

const removeItem = ()=> dispatch({

  type: actionTypes.REMOVE_ITEM,
  id: id,

})

  return (

   <Card sx={{ maxWidth: 345,  marginX:2, boxShadow:0}}>
      
        <Grid xs={12}  display="flex" justifyContent="center" paddingY={2} borderBottom="3px solid grey">
      
        <Grid xs={7} display="flex" justifyContent="flex-start" alignItems="center" height="86px" >
        <CardContent  padding={0}>

          <Typography gutterBottom variant="h5" component="div" fontWeight= 'bold' >
          {name}
          </Typography>
          <Typography variant="h5" color="text.secondary">
          {accounting.formatMoney(price, currency)}
          </Typography>
        </CardContent>
        </Grid>

        <Grid xs={5}>
        <CardMedia
          component="img"
          height="86px"
          width="149px"
          image={img}
          alt="green iguana"
        />
        </Grid>
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center"  marginY={2} >
     
        <Button variant="outlined" color="inherit" xs={12} 
                                          sx={{ 
                                          fontWeight:"bold", 
                                          fontSize:20, 
                                          display:"flex", 
                                          width:"100%", 
                                          size:"large",
                                          borderRadius:0,
                                          border:"3px solid"
                                           }} 
                  onClick={removeItem}>
         Clear
        </Button>
     
      </Grid>
    </Card>
  );
}






    

