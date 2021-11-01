import * as React from 'react';
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer'
import { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
 
  export default function Category  () {
  const [{items, categoryFilter},dispatch] = useStateValue();   
  const category = items?.map((product) => (product.category));
  const selectCat = [...new Set(category)]; 

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
    console.log(c)
    setChecked(all);
   
    dispatch({
      type: actionTypes.CATEGORY_FILTER,
      categoryFilter:all,
    })
  };
  function all(e){
   
   
    dispatch({
      type: actionTypes.CATEGORY_FILTER,
      categoryFilter:selectCat,
    })

  }

  
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel  sx={{fontSize:25, fontWeight: 'bolder', color:"black"}} component="legend">Category</FormLabel>
        <FormGroup>

          <FormControlLabel
          control={
              <Checkbox
                sx={{ '& .MuiSvgIcon-root': { fontSize:25 }, padding:3 }}
                value={selectCat}
                onChange={all}
                name="All"
                />


          }
          label={<span style={{ fontSize:25}}>ALL</span>}
          />
          {selectCat.map((product, index)=>(
          <FormControlLabel
         
            control={
              
              <Checkbox
              
              
              sx={{ '& .MuiSvgIcon-root': { fontSize:25 }, padding:3 }}
                className="checkbox"
                key = {index}
                
                value={product}
                onChange={handleToggle(product)}
                name={product}
              />
            }
            label={<span style={{ fontSize:25}}>{product}</span>}
            
          />
          ))}
          
        </FormGroup>
        
      </FormControl>
    </div>
  );
}
 
 



