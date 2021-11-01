import React from 'react'
import { useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {AddShoppingCart} from '@mui/icons-material';
import accounting from 'accounting';
import {createTheme, responsiveFontSizes, ThemeProvider,} from '@mui/material/styles';
import {useStateValue} from '../StateProvider'
import {actionTypes} from '../reducer'
import Box from '@mui/material/Box';
import ImageListItem from '@mui/material/ImageListItem';
import { Button} from '@mui/material';



let theme = createTheme();
theme = responsiveFontSizes(theme);

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function FilterCard({productFiltered:{

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
width,

}
}) {
  
  const [display,setDisplay] = useState("none");
  const [{basket,filterProducts },dispatch] = useStateValue();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    console.log(filterProducts)
  };
  const styles = {
    display:display,
  };

  const addToBasket = () =>{

    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item:{
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
        width,

      }
    })
  }

  return (

    
    <Box sx={{ width:"100%"}} >
      <Box display="flex" justifyContent="center" backgroundColor="text.disabled">
     <ImageListItem
      style={{height:"300px"}} >
        <img
        src= {img}
        alt={name}
        height="300px"
        />
        { featured && <Box position="absolute" bottom="0px" left="0px">
                      <Typography   sx={{backgroundColor:"white", fontSize:15, padding:2,fontFamily:"Impact"}}> Photo of the day </Typography>
                      </Box>}
        { featured && <Box position="absolute" top="0px" left="0px">
                        <Typography   sx={{backgroundColor:"white", fontSize:15, padding:2,fontFamily:"Impact"}}> Bestseller </Typography>
                      </Box>}    
              

     </ImageListItem>
     </Box>
      <Box sx={{ display:"static", heigth:"300px" }}>
        <Button
          variant="contained"  
          onClick={addToBasket}
          sx={{ 
          fontSize:"large", 
          width:"100%",
          color:"white", 
          backgroundColor:"black",
          borderRadius:0,
          padding:2}}
        >
          ADD TO CART
        </Button>
        <Typography  variant="h6" >{category}</Typography>
        <Typography  variant="h4" >{name}</Typography>
        <Typography
          variant='h5'
          color='textSecondary'
          >
              
          {accounting.formatMoney(price, currency)}
          </Typography>
      </Box>

    </Box>
    
  );
}
