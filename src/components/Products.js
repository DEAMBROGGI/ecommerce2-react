import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Featured from "./Featured";
import SyncAltSharpIcon from '@mui/icons-material/SyncAltSharp';
import Filtter from './FilterForm/Filtter';
import { Button, Typography } from '@mui/material';
import Price from './FilterForm/Price';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import {actionTypes} from '../reducer'
import Category from './FilterForm/Category';
import TuneIcon from '@mui/icons-material/Tune';
import {useStateValue} from '../StateProvider';

export default function Products  ({products}){

  const featured = products.filter(item => item.featured === true)

  const[categorySort, setCategorySort] = React.useState("price")
  const [orderSort, setOrderSrot] = React.useState("desc")
  const [{categoryFilter},dispatch] = useStateValue()

  
  const handleChangeCategorySort = (event) => {
    let category = event.target.value;
    let shortBy = category.concat(orderSort)
    setCategorySort(category)

    dispatch({
      type: actionTypes.ORDERBY,
      orderBy:shortBy,
    })

  };

  function changeOrder(){
    let order ="";
if(orderSort === "desc"){
  setOrderSrot("asce")
  order = "asce"
};
if(orderSort === "asce"){
  setOrderSrot("desc")
  order="desc"
};
let shortBy = categorySort.concat(order)

dispatch({
  type: actionTypes.ORDERBY,
  orderBy:shortBy,
})  
}
const [display,setDisplay] = useState({xs:"none", sm:"none", md:"block", lg:"block"});

const styles = {
  display:display,
};
function displayFilter(){
if(display.xs ==="none"){
setDisplay({xs:"block",sm:"flex", md:"block", lg:"block"})
}
if(display.xs ==="block"){
setDisplay({xs:"none", sm:"none", md:"block", lg:"block"})
}

}


  return (

<Box spacing={2} sx={{paddingX:3,
                      marginTop:"3%", 
                      position:"retative",
                      display:"block",
                      justifyContent:"center"
                      }}>
                        
    <Box >
       
        <Grid container spacing={2} marginLeft={0} width="100%" >
          <Grid> 
                {featured.map((items)=>(
                <Grid item sx={{borderBottom:"5px solid grey"}}>   
                  <Featured key={items.id} product={items}/>
                </Grid>
                  ))
                  }
                <Grid container xs={12}  sx={{justifyContent:"space-between"}}>
                  <Grid item xs={9} sm={6} md={6} lg={6} sx={{ width:"100%", flexGrow: 1, alignItems:"center",display: "inline-flex", padding:1}}>
                    
                    <Typography sx={{fontSize:{xs:12,sm:17},  fontWeight: 'bolder', color:"black", paddingRight:1}}>Photography / </Typography>
                    <Typography sx={{fontSize:{xs:12,sm:17},  fontWeight: 'bolder', color:"text.disabled"}}>  Premium Photos</Typography>

                  </Grid>

{/*.....................DISPLAY ICON FILTER.............................................*/}
               
                  <Grid item  >  
                    <Box
                     sx={{
                      display:{ xs:"flex", sm:"flex", md:"none", lg:"none", color:"black"},
                      alignItems:"center",
                      justifyContent:"flex-end", 
                      heigth:"30px", width:"100%",  
                      flexGrow: 1,  
                      padding:1}}>
   
                    <Button
                     sx={{ minWidth:0}}>
                    <TuneIcon onClick={displayFilter} size="20px"  sx={{ color:"black", transform:"rotate(90deg)"}}/> 
                    </Button>
                  
                    </Box>
                  </Grid>
                
{/*.....................DISPLAY SELECT CATEGORY.............................................*/}


                  <Grid item  >  
                    <Box
                     sx={{
                      display:{ xs:"none", sm:"none", md:"flex", lg:"flex"},
                      alignItems:"center",
                      justifyContent:"flex-end", 
                      heigth:"30px", width:"100%",  
                      flexGrow: 1,  
                      padding:1}}>
                    <Button
                    onClick={changeOrder} sx={{ color:"text.disabled", minWidth:0}}>
                    <SyncAltSharpIcon size="20px" sx={{ transform:"rotate(90deg)"}}/> 
                    </Button>
                    <Box sx={{display:"flex", alignItems:"center"}}>
                    
                    <Typography sx={{fontSize:15, fontWeight: 'bolder', color:"text.disabled", paddingRight:"10px"}}> Sort By</Typography>
                    </Box>
                    
                    <Box >
                        <FormControl fullWidth>
                        
                          <NativeSelect
                            disableUnderline
                            paddingRight={2}
                            defaultValue="price"
                            onChange={handleChangeCategorySort}
                            
                            inputProps={{
                              name: 'category',
                              id: 'uncontrolled-native',
                            }}
                          
                          >
                            <option value="price">Price</option>
                            <option value="rating">Rating</option>
                            
                          </NativeSelect>
                        </FormControl>
                      </Box>
                      </Box>
                  </Grid>  
                </Grid> 

          <Grid container xs={12} >

 {/*.....................DISPLAY CHECKBOX FILTERS.............................................*/}           

            <Grid  sm={12} md={4} lg={3} >
            <Box sx={{padingTop:"0px", paddingBottom:"0px"}}>

            <Box sx={{paddingBottom:"0px"}}>
            <Box sx={{width:"100%",
                      ...styles,
                      flexDirection:"row", 
                      justifyContent:"center",
                      marginTop:1,     
                      }}>

                <Grid xs={12} sm={6} md={12} lg={12} sx={{borderBottom:"5px solid grey", padding:1, width:"80%", marginTop:1}}>
                <Category/>
                </Grid>

                <Grid xs={12} sm={6} md={12} lg={12} sx={{padding:1}}>
                  <Price sx={{ width:"80%",                
                                  flexDirection:"row", 
                                  justifyContent:"center", 
                                  marginTop:1,
                                  }}/>
                
                </Grid>
                </Box>              
            </Box>
            </Box>
            </Grid>
{/*.....................DISPLAY PRODUCTS.............................................*/}

            <Grid container  xs={12} sm={12} md={8} lg={9} width="100%" > 
               <Filtter/>
            </Grid>     
          </Grid>    
        </Grid>
      </Grid>
    </Box>
    </Box>
  );
}

