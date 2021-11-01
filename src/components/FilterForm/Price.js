import * as React from 'react';
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer'
import { useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const priceRange =[
                {id:1,
                name:"All",
                price:[-Infinity,Infinity]},

                {id:2,
                name:"Lower than 20",
                price: [0,20]},  

                {id:3,
                name:"$20 - $100",
                price:[20.1,100]},

                {id:4,
                name:"$100 - $200",
                price:[100.1,200]},

                {id:5,
                name:"More than $200",
                price:[200.1,Infinity]},

                
                    
]
 
  export default function Price  () {
    const [{items},dispatch] = useStateValue(); 
    const prices = priceRange.map((product) => (product));

  const [checked, setChecked] = useState([]); 

  const handleToggle = c => () => {
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
      all.push(c);
    } else {
      all.splice(clickedCategory, 1);
    }
    
    setChecked(all);

    dispatch({
      type: actionTypes.PRICE_FILTER,
      priceSelected:all,
    })
  
  };
  
  return (
      
    <div>
      <FormControl component="fieldset">
        <FormLabel  sx={{fontSize:25, fontWeight: 'bolder', color:"black"}} component="legend">Price</FormLabel>
        <FormGroup>
          {prices.map((product)=>(
          <FormControlLabel
         
            control={

              <Checkbox
              fontSize="3rem"
              sx={{ '& .MuiSvgIcon-root': { fontSize:25 }, padding:3 }}
          
                key = {product.id}
                value={product}
                onChange={handleToggle(product.price)}
                name={product.name}
              />
            }
            label={<span style={{ fontSize:25}}>{product.name}</span>}
            
          />
          ))}
        </FormGroup>
        
      </FormControl>
    </div>
  );
}
 
 
