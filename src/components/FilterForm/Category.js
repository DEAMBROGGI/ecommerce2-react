import * as React from 'react';
import {useStateValue} from '../../StateProvider';
import {actionTypes} from '../../reducer'
import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import "../../styles/index.css"
 
  export default function Category  () {
  
  const [{items, categoryFilter},dispatch] = useStateValue();   
  const category = items?.map((product) => (product.category));
  const selectCat = [...new Set(category)]; 
  const [checked, setChecked] = useState([]); 
   
  const handleToggle = (c ) => (event) => {
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
      type: actionTypes.CURRENT_PAGE,
      currentPage:1,
    })    
  
  
    if(window.innerWidth>900){
      dispatch({
        type: actionTypes.CATEGORY_FILTER,
        categoryFilter:all,
      })
    }
      if(window.innerWidth<900){
      dispatch({
        type: actionTypes.CATEGORY_FILTER_SMALL,
        categoryFilterSmall:all,
      })
    }
    
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel  sx={{fontSize:25, fontWeight: 'bolder', color:"black"}} component="legend">Category</FormLabel>
 
          {selectCat.map((product,index)=>(
          <form className="form" >

              <input type="checkbox" className="checkBox"
     
                className="checkbox"
                key = {index}
                id={index}
                value={product}
                onChange={handleToggle(product,index)}
                name={product}
                checked={checked[product]}
                
              />
            
            <label className="label-checkbox" for={index}> {product}</label><br></br>
            
            </form>
          ))}

      </FormControl>
    </div>
  );
}
 
 



