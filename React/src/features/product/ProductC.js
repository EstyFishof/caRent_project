import { useDispatch, useSelector } from "react-redux";
import { deleteProductById, addProduct, getAllProducts } from "./ProductApi";
import { setSelectedCategory } from "./ProductSlice";
import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Outlet, Link } from "react-router-dom";
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from 'react';
import './ProductC.css';
import { addToBasket, removeFromBasket } from "../order/OrderSlice";
import Typography from '@mui/material/Typography';


export const ProductC = ({ one, displayType = 'regular', numOfProductBasket = 1 }) => {
  let dispatch = useDispatch()
  let basket = useSelector(state => state.order.basket);
  const [numOfProduct, setNumOfProduct] = useState(numOfProductBasket);

  const deleteFromServer = async () => {
    try {
      let res = await deleteProductById(one._id);
      console.log(res);
      alert("המחיקה הצליחה")
    } catch (err) {
      alert("המחיקה נכשלה")
      console.log(err)
    }
  }
  const increase = () => {
    setNumOfProduct(numOfProduct + 1);
    dispatch(addToBasket({ one, numOfProduct: 1 }))
  }
  const reduce = () => {
    setNumOfProduct(Math.max(numOfProduct - 1, 0));
    dispatch(removeFromBasket({ one, numOfProduct: 1 }))
  }



  return (

    <ImageListItem className="image" key={one.imgUrl} >
      <img Link to={"details"}
        srcSet={`${one.imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${one.imgUrl}?w=248&fit=crop&auto=format`}    
          />
      {displayType == 'regular' ?
        <ImageListItemBar
          title={`${one.productName}, ${one.category}`}
          subtitle={one.price + " " + "$"}
          actionIcon={
            <MenuItem key={"more"}>
              <Button variant="contained" className='buttonOrder'><Link to={"details"} state={one} className="buttonLink">עוד</Link></Button>
            </MenuItem>
          }
        /> :
        <div>     
           <Typography variant="body2" color="text.secondary">
         <h3 className='h2'>מחיר:{one.price}$ </h3>
         <h3 className='h2'>מחיר סה"כ למוצר זה:{one.price*one.quantity}$  </h3>
       </Typography>
        <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ direction: 'ltr' }} className="allButtonGroup">
          <Button variant="contained" sx={{ direction: 'ltr' }} className='buttonGroup' type={"submit"} onClick={increase}>+</Button>
          <Button variant="contained" className='buttonGroup'>{numOfProduct}</Button>
          <Button variant="contained" className='buttonGroup' type={"submit"} onClick={reduce}>-</Button>
        </ButtonGroup>
   
       </div>
      }
    </ImageListItem>

  );
}







