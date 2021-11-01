import Grid from '@mui/material/Grid';
import {useStateValue} from '../../StateProvider';
import React from 'react';
import FilterPage from '../FilterPage';
import { Typography } from '@mui/material';
export default function Filtter() {

const [{items,priceSelected,
orderBy,categoryFilter, filterProducts}, dispatch] =useStateValue([]);

let dataFilter = [];

const price =  priceSelected?.flat()
const min =Math.min.apply(null,price)
const max =Math.max.apply(null,price)

let precio = 
    items?.filter(item => item.price >= min && item.price <= max);
    dataFilter.push(precio)

const cat =  categoryFilter?.map(category =>
items.filter(items => items.category ===  category));

let categoria=cat.flat()
dataFilter.push(categoria)
    
  
    let test = dataFilter.flat();

   //Los Arrays anidados de se unifican
   const data = categoryFilter?.map(category => test.filter(item => 
    item.price >= min && item.price <= max &&
    item.category===  category)).flat()

let result =[]
//Buscar duplicados por ID
const busqueda = data?.reduce((acc, product) => {
  acc[product.id] = ++acc[product.id] || 0;
  return acc;
}, {});
// Separar todos lo elementos que repiten
const duplicados =  data?.filter( (product) => {
  return busqueda[product.id];
});
//Eliminar los ids repetidos y generar RESULTADO con condicional else para asegurar
//que la pagina no quede en blanco
if(duplicados.length >0){result =  duplicados.filter((item,index)=>{
  return duplicados.indexOf(item) === index;
  
})

}else {return (
<React.Fragment>
  <Grid display="flex" justifyContent="center" alignItems="center">
<Typography variant="h1" textAlign="center" >Sorry no matches, try a broader filter</Typography>
</Grid>
</React.Fragment>

)};

// SE ESTABLECE SWITCH PARA ESTABLECER ORDEN DE LA BASE
  switch(orderBy.toString()){
    case "priceasce":
            result.sort(function (a, b){
            return (a.price - b.price)
          });
          break;
    case "pricedesc":
            result.sort(function (a, b){
            return (b.price - a.price)
          })
          break;
    case "ratingasce":
            result.sort(function (a, b){
            return (a.rating - b.rating)
            })
          break;
    case "ratingdesc":
            result.sort(function (a, b){
            return (b.rating - a.rating)
            })
          break;
    case "":
            result.sort(function (a, b){
            return (b.featured - a.featured)
            })
          break;                  
    default: return "";
      }

return(

            <Grid container  xs={12}  width="100%" > 
               <FilterPage result={result}/>
            </Grid> 

);
}




  