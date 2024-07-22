import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import ProductList from './features/product/ProductList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addProduct, getAllProducts } from './features/product/ProductApi';
import Product from './features/product/Product';
import ProductDetails from './features/product/ProductDetails';
import NavBar from './NavBar';
import { userIn } from "./features/user/userSlice";
import {Login} from './features/user/Login';
import AllProductC from './features/product/AllProductC';
import { SignUp } from './features/user/SignUp';
import { AddProductAdmin } from './features/product/FormAddProduct';
import {Basket} from "./features/order/OrderBasket";
import Footer from './Footer';
import SwipeableTextMobileStepper from './HeaderNew';
import SmallBasket from './features/order/SmallBasket';
import { addToBasket, setBasket } from './features/order/OrderSlice';
import { boxClasses } from '@mui/material';


function App() {
  let dispatch = useDispatch();
  useEffect(() => {
    let u = localStorage.getItem("currentUser");
    if (u) {
      dispatch(userIn(JSON.parse(u)));
    }
    let b = localStorage.getItem("basket");
    if (b) {
      let basket = JSON.parse(b);
      dispatch(setBasket(basket));
    }
  }, []);
  return (
    <div>
      <NavBar/>
      <Routes>
      <Route path='/' element={<ProductList/>}/>
      <Route path='all' element={<AllProductC/>}/>
      <Route path='all/details' element={<ProductDetails/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='register' element={<SignUp/>}/>
      <Route path='basket' element={<Basket/>}/>
      <Route path='addProduct' element={<AddProductAdmin/>}/>
      <Route path='smallBasket' element={<SmallBasket/>}/>
      <Route path='home' element={<SwipeableTextMobileStepper/>}/>
    
      </Routes>
      <Footer/>
    </div>

  );
}

export default App;
