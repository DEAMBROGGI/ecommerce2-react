import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useStateValue} from '../StateProvider';
import "../styles/App.css"
import Grid from '@mui/material/Grid';
import { Button} from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
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

    dispatch({
      type: actionTypes.LOAD_BUYPAGE,
      verBuyCart:true 
    })
  }
 return (

     <Box padding={1}>
        
      <Box  sx={{ flexGrow: 1}}>
        <Grid container xs={12}>
        <Grid item xs={12} lg={10}>
          <Typography variant="h4" fontWeight= 'bold'  >
              {name}
          </Typography>
          </Grid>
          <Grid item xs={"none"} lg={2} color="black">
          <Button
            onClick={addToBasket}
            variant="contained" color="info" 
            sx={{display: {xs:"none", lg:"block" }, 
                fontSize:"large", 
                width:"100%",
                color:"white",
                backgroundColor:"black",
                heigth:"47px",
                borderRadius:0}}
          >
            ADD TO CART
          </Button>
          </Grid>
          </Grid> 
      </Box>
      <Box  sx={{width:"100%", justifyContent:"center",margin:"auto", paddingTop:2, paddingBottom:2, heigth:"553px"}} >
      <ImageListItem
      sx={{display:"flex" }}>
        <img
        src= {img}
        alt={name}
        />
           { featured && <Box position="absolute" bottom="-1px" left="-1px" width="272px" heigth="67px"
           display="flex" justifiyContent="center">
              <Typography fontSize="20px"  sx={{backgroundColor:"white", padding:4,fontWeight: 'bold'}}> Photo of the day </Typography>
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
        <Grid item xs={12} md={6} lg={6}> 
     
          <Typography variant="h5" sx={{ padding:2 , fontWeight: 'bold'}}>About the {name}</Typography>
       
            <Typography color="text.secondary" paddingLeft={2} >
              {details}
            </Typography>
       
      </Grid>
      <Grid md={1} lg={2} ></Grid>
      <Grid container item xs={12}   md={5} lg={4} display="flex">
        <Grid item xs={12}>
      <Typography variant="h5" sx={{paddingX:"16px",fontWeight: 'bold',
        textAlign:{
          lg:'right',
          xs:'left',
          md:"left"
          }}}> People also buy</Typography>  
      </Grid >  
      <Grid  item xs={12}  display="flex" spacing={4} paddingY={2}> 
      {bestRank.map((product) => (
        <Grid xs={4}  >
          <Box>
        <img
        width="100%"
        heigth="100%"
        src= {product}
        />
          {product.img}
          </Box>
        </Grid>
      ))}
      </Grid>
        <Grid item xs={12} display="block" >
        <Typography variant="h6" sx={{paddingX:"16px",fontWeight: 'bold', 
        textAlign:{
          lg:'right',
          xs:'left',
          md:"left"
          }}}> Details</Typography> 
          <Typography  sx={{padding:"16px", color:"text.secondary" ,
        textAlign:{
          lg:'right',
          xs:'left',
          md:"left"
          }}}> Size {width} X {height}</Typography> 

        </Grid>
      </Grid>
      </Grid>
    </Box> 
  ); 
}
