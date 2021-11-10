import * as React from 'react';
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer'
import { useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import Products from '../Products';

const priceRange =[
               
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
    let anchoVentana = window.innerWidth
    const [{items},dispatch] = useStateValue(); 
    const prices = priceRange.map((product) => (product));

  const [checked, setChecked] = useState([]); 
  const [checkedItem, setCheckedItem] = useState([])

  const handleToggle = (c,n) => () => {
    
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];
    let item ={...checkedItem};

    if (clickedCategory === -1) {
      all.splice(clickedCategory, 1);
      
      all.push(c);
      item=n;
    } else {
      all.splice(clickedCategory, 1);
      
    }
    
    setChecked(all);
    setCheckedItem(item)

    if(anchoVentana>900){
    dispatch({
      type: actionTypes.PRICE_FILTER,
      priceSelected:all,
    })
    }
    if(anchoVentana<900){
      dispatch({
        type: actionTypes.PRICE_FILTER_SMALL,
        priceSelectedSmall:all,
      })
    }
  };
 
  return (
      
    <div>
      <FormControl component="fieldset">
        <FormLabel  sx={{fontSize:25, fontWeight: 'bolder', color:"black"}} component="legend">Price</FormLabel>
       
          {prices.map((product,index)=>(
         <form className="form" >

              <input type="checkbox" className="checkBox"
     
                className="checkbox"
                key = {index}
                id={index}
                value={product}
                onChange={handleToggle(product.price, product.id)}
                name={product.name}
                checked={checkedItem === product.id}
               
               
              />
              
            <label className="label-checkbox" for={index}> {product.name}</label><br></br>
            
            </form>
            
         
          ))}
      
        
      </FormControl>
    </div>
  );
}
 
 
