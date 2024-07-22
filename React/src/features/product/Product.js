import { useDispatch } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { deleteProductById, addProduct, getAllProducts } from "./ProductApi";
import {  setSelectedCategory } from "./ProductSlice";
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Outlet, Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createTheme } from '@mui/material/styles';
import { purple, amber, yellow } from '@mui/material/colors';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Tab } from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export const Product = ({ one }) => {
  let dispatch = useDispatch()
  let navigate = useNavigate();

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

  const findCar = (name) => {
    dispatch(setSelectedCategory(name));
    navigate('/all')
  }

  return (
    <div className="allCards">
      <Card className="card" onClick={() => findCar(one.productName)}  >
       
        <CardMedia 
          sx={{ height: 140 }}
          image={one.imgUrl} alt={one.productName}
          title="caRent"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div">
          {one.productName}
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
          
          </Typography>
        </CardContent>
        <MenuItem key={"search"}>
              <Button
               variant="contained"
               className='buttonSearch'
               type={"search"} 
               onClick={() => findCar(one.productName)}
               sx={{ml:15}}>חפש לי רכב

                </Button>
            </MenuItem>
      </Card>
    </div>);
}




