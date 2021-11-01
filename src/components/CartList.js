import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCart  from '@mui/icons-material/ShoppingCart';
import {useStateValue} from '../StateProvider';
import BuyCard from './BuyCard';
import Box from '@mui/material/Box';

export default function CartList() {

const[ver,setVer]= React.useState(false)
const [{basket},dispatch] = useStateValue();  

if(ver){
    List();
}

function change(){
    if(basket.length>0){
    setVer(true)
    }
}


function List (){

return(
<React.Fragment>
        <Box position="absolute" top="40px" right="30px" zIndex={100} >
            {basket?.map((item)=> 

                <BuyCard key={item.id} product={item} margin={2} sx={{ boxShadow: 3 }}/>

            )}  
        </Box>
</React.Fragment>

)
}

return(
            <div>           
    
                <Badge badgeContent={basket?.length} color="error" value={basket?.length} onChange={change}  >
                    <ShoppingCart style={{fontSize:"40px", color:"black"}} />
                </Badge>
          
               <List/>
            </div>
);
}
