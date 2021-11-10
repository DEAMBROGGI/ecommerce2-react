import * as React from 'react';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {useStateValue} from '../StateProvider';
import BuyCard from './BuyCard';
import Box from '@mui/material/Box';
import {actionTypes} from '../reducer'
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';

export default function CartList() {

const [{verBuyCart,basket},dispatch] = useStateValue();  
const [ver,setVer]=React.useState(verBuyCart)

function open(){
    if(ver===true){
        setVer(false)
    }
    if(ver===false){
        setVer(true)
    }
        dispatch({
            type: actionTypes.LOAD_BUYPAGE,
            verBuyCart:ver    
          })
}

function close(){
 
    if(ver){
        setVer(false)
    }
    else{
        setVer(true)
    }
     dispatch({
    type: actionTypes.LOAD_BUYPAGE,
    verBuyCart:ver    
  })
 }

const List =()=>{
    
return(
<React.Fragment>
        <Box  position="absolute" top="100px" right="0" zIndex={100} backgroundColor="white" border="5px solid grey">
            <Box >
            <Grid xs={12} sm={12} display="flex" justifyContent="flex-end">
            <Button onClick={close}>   
            <AddIcon   sx={{ fontSize: "55px",color:"black", transform:"rotate(45deg)"}}/>
            </Button>
            </Grid>
            {basket?.map((item,index)=> 
            
               <BuyCard key={index} product={item} />
            )}  
            </Box>
        </Box>
</React.Fragment>
)
}

return(
            <div>           
                <Button onClick={open} style={{padding:"0px"}}>
                <Badge badgeContent={basket?.length}  value={basket?.length}
                overlap="rectangular" color="error" 
                sx={{ "& .MuiBadge-anchorOriginBottomRightRectangular": { borderRadius:0, backgroundColor:"black" } }}
                
                 anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
        
                  }} >
                    <ShoppingCartOutlinedIcon style={{fontSize:"50.45px", color:"black", borderRadius:"0px"}} />
                </Badge>
                </Button>
          
             {verBuyCart && basket.length>0 &&  <List/>}
            </div>
);
}
