import Grid from '@mui/material/Grid';
import {useStateValue} from '../../StateProvider';
import React from 'react';
import FilterPage from '../FilterPage';

export default function Filtter() {

const [{items,priceSelected,
orderBy,categoryFilter, filterProducts}, dispatch] =useStateValue([]);

let dataFilter = [];

//PRECIOS SELECCIONADOS
const price =  priceSelected?.flat() // si existe un valor a filtrar
let priceList = items?.map(item=> item.price) //si no existe un valor a filtrar
//Establecemos min
let min = Math.min.apply(null,price) //con filtro aplicado
if(priceSelected.length===0){ min = Math.min.apply(null,priceList)} //sin filtro aplicado
//Establecemos max
let max =Math.max.apply(null,price)//con filtro aplicado
if(priceSelected.length===0){ max = Math.max.apply(null,priceList)} //sin filtro aplicado

//Buscamos productos dentro de los rangos de precio
let precio = items?.filter(item => item.price >= min && item.price <= max);  

//CATEGORIA TOTAL
let catTotal =items?.map( item =>item.category) 
let todasCategorias = [...new Set(catTotal)]; //buscamos todas las categorias de los productos

let categoriasAFiltrar =[]
if(categoryFilter.length >0){categoriasAFiltrar = categoryFilter} //con filtro aplicado
if(categoryFilter.length ===0){categoriasAFiltrar = todasCategorias} //sin filtro aplicado

//buscamos productos con las categorias seleccionadas
const cat =  categoriasAFiltrar?.map(category =>
items.filter(items => items.category ===  category));

let categoria=cat.flat()

//Empujamos precios y categorias a dataFilter
dataFilter.push(categoria, precio)


//Unificamos los Arrays de data Filter en un solo Array
let test = dataFilter.flat();

//Filtramos el array test por los productos que cumplas as condiciones de precio y categoria
const data = categoriasAFiltrar?.map(category => test.filter(item => 
item.price >= min && item.price <= max &&
item.category===  category)).flat()

let result = []
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
result =  duplicados.filter((item,index)=>{
return duplicados.indexOf(item) === index;
  
})
result.sort( (a, b) => (a.name > b.name) ? 1 : -1)

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
    case "nameasce":
            result.sort(function (a, b){
            return (a.name > b.name)
            })
          break;
    case "namedesc":
            result.reverse(function (a, b){
            return (b.name < a.name)
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




  