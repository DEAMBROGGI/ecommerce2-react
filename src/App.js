
import './styles/App.css';
import './styles/index.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import React, { useState, useEffect } from 'react';
import { db } from './components/Firebase';
import 'firebase/firestore';
import {getDocs, collection,  query, orderBy } from 'firebase/firestore/lite'
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import { auth } from './components/Firebase';
import { actionTypes } from './reducer';
import {useStateValue} from './StateProvider';

function App() {
  
  const [{user},dispatch] = useStateValue();
  const [products, setProducts] = useState([]);
  

async function getProducts() {
  const first= query(collection(db, 'products'), orderBy("featured","desc"));
  const productsSnapshot = await getDocs(first);
  const productsList = [] 
  let selectCat =[]
  let initialPrice=[]
  
  productsSnapshot.docs.forEach(function(doc) {
  productsList.push({ id: doc.id, ...doc.data() });

  const category = productsList.map((product) => (product.category));
  selectCat = [...new Set(category)];

  const prices = productsList.map((product) => (product.price));
  const priceMin = Math.min.apply(null, prices);
  const priceMax = Math.max.apply(null, prices);
   initialPrice = [].concat(priceMin,priceMax);
});
  setProducts(productsList);
  
  dispatch({
    type: actionTypes.LOAD_PRODUCTS,
    items: productsList,
    categoryFilter:selectCat,
    priceSelected:initialPrice,
    filterProducts:productsList,
  })
  
}
 
  useEffect(() => {
    
    getProducts();

    auth.onAuthStateChanged((authUser, ) => {
     
      if (authUser) {
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        })
      } 
    });
 }, []);

  return (
    
   <Router >
    <div className="body">
    
    <Switch>
        <Route path='/'>
        <Navbar key={products.id} products={products} />
        <Products key={products.id} products={products}/>
        </Route>
    </Switch>
    </div>
    </Router>  
  )
}

export default App;
