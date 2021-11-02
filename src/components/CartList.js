import * as React from 'react';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShoppingCart  from '@mui/icons-material/ShoppingCart';
import {useStateValue} from '../StateProvider';
import BuyCard from './BuyCard';
import Box from '@mui/material/Box';
import {actionTypes} from '../reducer'
export default function CartList() {


const [{verBuyCart,basket},dispatch] = useStateValue();  
const [display,setDisplay] = React.useState("block");
const [ver,setVer]=React.useState(verBuyCart)
const styles = {
    display:display,
  };


function close(){
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

const List =()=>{
    
return(
<React.Fragment>
        <Box style={styles} position="absolute" top="40px" right="30px" zIndex={100} >
            {basket?.map((item,index)=> 

               <BuyCard key={index} product={item} margin={2} sx={{ boxShadow: 3 }}/>
            )}  
        </Box>
</React.Fragment>
)
}

return(
            <div>           
                <Button onClick={close}>
                <Badge badgeContent={basket?.length} color="error" value={basket?.length} >
                    <ShoppingCart style={{fontSize:"40px", color:"black"}} />
                </Badge>
                </Button>
          
             {verBuyCart &&   <List/>}
            </div>
);
}
