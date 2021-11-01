import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useStateValue} from '../StateProvider';
import "../styles/App.css"
import Grid from '@mui/material/Grid';
import { Button} from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {actionTypes} from '../reducer'

export default function Featured ({product:{

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

  const [{items},dispatch] = useStateValue();
  
  const [expanded, setExpanded] = React.useState(false);

  const bestRating = items.sort(function (a, b){
  return (b.rating - a.rating)
  })
  const bestRank = bestRating.slice(1,4).map((product) => (product.img));
  
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

     <Box >
        
      <Box  sx={{ flexGrow: 1}}>
        <Grid container xs={12}>
        <Grid item xs={12} lg={8}>
          <Typography variant="h5" padding={2} sx={{ fontFamily:"Impact"}}>
              {name}
          </Typography>
          </Grid>
          <Grid item xs={"none"} lg={4} color="black">
          <Button
            onClick={addToBasket}
            variant="contained" color="info" 
            sx={{display: {xs:"none", lg:"block" }, 
                marginTop:"1rem",
                fontSize:"large", 
                width:"100%",
                color:"white",
                backgroundColor:"black"}}
          >
            ADD TO CART
          </Button>
          </Grid>
          </Grid> 
      </Box>
      <Box  sx={{width:"100%", justifyContent:"center",margin:"auto", paddingTop:2, paddingBottom:2}} >
      <ImageListItem
      sx={{display:"flex" }}>
        <img
        src= {img}
        alt={name}
        />
           { featured && <Box position="absolute" bottom="-1px" left="-1px">
              <Typography fontSize="4vw"  sx={{backgroundColor:"white", padding:2,fontFamily:"Impact"}}> Photo of the day </Typography>
            </Box>}

      </ImageListItem>
      
      </Box>
      <Grid item xs={12} lg={0} color="black">
          <Button
            onClick={addToBasket}
            variant="contained" color="info" 
            sx={{display: {xs:"block", lg:"none" },
            marginTop:"1rem",
            paddingY:2, 
            fontSize:"large", 
            width:"100%",
            color:"white", 
            backgroundColor:"black"}}
          >
            ADD TO CART
          </Button>
          </Grid>
        <Grid container xs={12} sx={{ flexGrow: 1, paddingY:2, alignItems:"baseline"}}>
        <Grid item xs={12}  lg={7}> 
        <Accordion
        sx={{boxShadow:"none"}}>
        <AccordionSummary
         
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h5" sx={{ fontFamily:"Impact"}}>About the {name}</Typography>
        </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {details}
            </Typography>
          </AccordionDetails>
      </Accordion>
      </Grid>
      <Grid container item xs={12}  lg={5} display="flex">
        <Grid item xs={12}>
      <Typography variant="h5" sx={{paddingX:"16px",fontFamily:"Impact", 
        textAlign:{
          lg:'right',
          xs:'left'
          }}}> People also buy</Typography>  
      </Grid >  
      <Grid  item xs={12} display="flex" > 
      {bestRank.map((product) => (
        <Grid xs={4} spacing={1} >
          <Box>
        <img
        width="100%"
        height="100%"
        src= {product}
        />
          {product.img}
          </Box>
        </Grid>
      ))}
      </Grid>
        <Grid item xs={12} display="block" >
        <Typography variant="h6" sx={{paddingX:"16px",fontFamily:"Impact", 
        textAlign:{
          lg:'right',
          xs:'left'
          }}}> Details</Typography> 
          <Typography  sx={{paddingX:"16px", 
        textAlign:{
          lg:'right',
          xs:'left'
          }}}> Size {width} X {height}</Typography> 

        </Grid>
      </Grid>
      </Grid>
    </Box> 
  ); 
}
