import * as React from 'react';
import { useRef} from "react";
import { Button, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Price from "./Price"
import Category from "./Category"
import Popover from '@mui/material/Popover';
import AddIcon from '@mui/icons-material/Add';
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer'

export default function FilterSmall() {

  
    const [{fullCat, fullPrice ,priceSelectedSmall, categoryFilterSmall},dispatch] = useStateValue();

    const inputRef = useRef();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [checkedPrice, setcheckedPrice] = React.useState()
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
      let coords = inputRef.current.getBoundingClientRect()
      inputRef.current.scrollIntoView()
  
      
    };
 
    const handleClose = () => {
      dispatch({
        type: actionTypes.CATEGORY_FILTER_SMALL,
        categoryFilterSmall:fullCat,
      })
      dispatch({
        type: actionTypes.PRICE_FILTER_SMALL,
        priceSelectedSmall:fullPrice,
      })
      
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    let categoriaSeleccionada=categoryFilterSmall
    let precioSeleccionado=priceSelectedSmall

    function apply(e){

        dispatch({
            type: actionTypes.CATEGORY_FILTER,
            categoryFilter:categoriaSeleccionada,
          })
          dispatch({
            type: actionTypes.PRICE_FILTER,
            priceSelected:precioSeleccionado,
          })
          
          inputRef.current.scrollIntoView()
    }
    function clear(e){
      
  dispatch({
    type: actionTypes.CATEGORY_FILTER,
    categoryFilter:fullCat,
  })
  dispatch({
    type: actionTypes.PRICE_FILTER,
    priceSelected:fullPrice,
  })
  
  let data =  document.querySelectorAll('input[type=checkbox]')
      for (let i = 0; i < data.length; i++) {
      data[i].checked = false
     
  }
  handleClose();
}

  return (

<React.Fragment> 
      <Button
        ref={inputRef}
        onClick={handleClick}
      >
       <TuneIcon size="20px"  sx={{ color:"black", transform:"rotate(90deg)"}}/>
      </Button>
     
<Popover
        sx={{"& .MuiPaper-root":{overflowY:"clip"}}}
        
        height="500px"
        width="100%"
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
>
<Box>
    <Grid xs={12} sm={12} display="flex" justifyContent="center" alignItems="center">
            <Grid xs={9} sm={9}>
            <Typography sx={{fontSize:{xs:25,sm:25},  fontWeight: 'bolder', color:"black", padding:2}}>Filter </Typography>
        
            </Grid>
            <Grid xs={3} sm={3} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose}>   
            <AddIcon   sx={{ fontSize: "55px",color:"black", transform:"rotate(45deg)"}}/>
            </Button>
            </Grid>
    </Grid>
    <Box display="flex" position="relative" justifyContent="center" width="100%" maxHeight="84vh">
        <Box  position="absolute" bottom="0px" left="0px" zIndex={1000} width="100%" display="flex" justifyContent="center" alignItems="center"   
        sx ={{backgroundColor:"white", height:"104px",borderTop:"5px solid grey" }} >
            <Grid container xs={12} sm={12} display="flex" justifyContent="center" alignItems="center" >

                <Grid item xs={6} sm={6}   display="flex" justifyContent="center" >
                    <Button variant="outlined" color="inherit" 
                            onClick={clear}
                            sx={{ 
                            padding:0, 
                            fontWeight:"bold", 
                            fontSize:20, 
                            display:"flex", 
                            width:"80%", 
                            borderRadius:0,
                            border:"3px solid",
                            backgroundColor:"white",
                             }} 
                     >
                     Clear
                    </Button>
                </Grid>
                <Grid item xs={6} sm={6}  display="flex" justifyContent="center" >
                   
                    <Button variant="outlined"
                    id="checked"
                     onClick={apply}
                            sx={{ 
                            padding:0, 
                            fontWeight:"bold",
                            fontSize:20, 
                            width:"80%",
                            color:"white", 
                            backgroundColor:"black",
                            borderRadius:0,
                            border:"3px solid black",

                          }}
                          style={{ backgroundColor:"black", borer:"1px solid black"}}
                    >
                    Apply
                    </Button>
                </Grid>                   
                  
            </Grid>
        </Box>
        
        <Box sx={{padingTop:"0px", paddingBottom:"0px", height:"600px", position:"relative", overflowY:"auto",
                "& .MuiCheckbox-root":{padding:1},
                '& .MuiSvgIcon-root': { fontSize:40 },
                 }}>
            <Grid container xs={12} sm={12} >

                <Grid item xs={12} sm={12}  sx={{borderBottom:"5px solid grey", 
                                                padding:1, 
                                                width:"100%",
                                                '& .MuiFormLabel-root': { display:"none" } 
                                               }}>
                <Category />
                </Grid>

                <Grid item xs={12} sm={12} sx={{padding:1, paddingBottom:13, marginBottom:11}}>

                  <Price sx={{ width:"100%",                
                                  
                                  justifyContent:"center", 
                                  marginTop:1,
                                  }}
                                
                                  checked={checkedPrice}
                                  />
                
                </Grid> 
            </Grid>
        </Box>           
    </Box>         
</Box>     
</Popover>
</React.Fragment> 
);
}
