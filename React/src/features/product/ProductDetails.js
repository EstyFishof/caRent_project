
import * as React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './ProductDetails.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LuggageIcon from '@mui/icons-material/Luggage';
import FlightClassIcon from '@mui/icons-material/FlightClass';
import { Tab } from "@mui/material";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProductById } from "./ProductApi";
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import { addToBasket } from '../order/OrderSlice';
import OrderSlice from '../order/OrderSlice';
import { useDispatch, useSelector } from "react-redux";
import { GrStatusGood } from "react-icons/gr";
import ButtonGroup from '@mui/material/ButtonGroup';





const ProductDetails = () => {
  let one = useLocation().state;
  let navigate = useNavigate();
  const theme = useTheme();
  let dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const [numOfProduct, setNumOfProduct] = useState(1);
  const increase = () => {
    setNumOfProduct(numOfProduct + 1);
  }
  const reduce = () => {
    setNumOfProduct(Math.max(numOfProduct - 1, 0));
  }
  const addProductInClient = async (one) => {
    try {
      dispatch(addToBasket({ one, numOfProduct }))
      alert("הרכב נוסף להזמנתכם CARENT 🚗");
      setTimeout(() => {
        navigate('/smallBasket');
   
    }, 1000);
    setTimeout(() => {
      navigate('/all');
 
  }, 8000);

      //  navigate()
    } catch (err) {
      alert(" לא הצליח להוסיף");
    }
  }


  const deleteFromServer = async () => {
    try {
      let res = await deleteProductById(one._id, user.token);;
      console.log(res);
      alert("המחיקה הצליחה")
    } catch (err) {
      alert("המחיקה נכשלה")
      console.log(err)

    }
  }


  return (
    <div className="details">
      <Card sx={{ display: 'flex' }} className='cardDetails' >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {one.productName}
            </Typography>
            <Typography component="div" variant="h6">
              {"$" + " " + one.price + " " + "ליום השכרה"}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <IconButton aria-label="previous">
                {theme.direction === 'ltr' ? <FlightClassIcon /> : <FlightClassIcon />}
              </IconButton>
              {` מספר מקומות: ${one.seats}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <IconButton aria-label="previous">
                {theme.direction === 'ltr' ? <LuggageIcon /> : <LuggageIcon />}
              </IconButton>
              {` מספר מזוודות: ${one.suitcases}`}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <IconButton aria-label="previous">
                {theme.direction === 'ltr' ? <BusinessCenterIcon /> : <BusinessCenterIcon />}
              </IconButton>
              {` מספר תיקים: ${one.bags} `}
            </Typography>
            <div>
              <Typography variant="h5" color="text.secondary" component="div" className='font' >
                התוכנית כוללת
              </Typography>
            </div>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <IconButton aria-label="previous">
                {theme.direction === 'ltr' ? <GrStatusGood /> : <GrStatusGood />}
              </IconButton>
              ק"מ בלתי מוגבל
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <IconButton aria-label="previous">
                {theme.direction === 'ltr' ? <GrStatusGood /> : <GrStatusGood />}
              </IconButton>
              הרחבת ביטוח צד ג' עד $ 1,000,000
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <IconButton aria-label="previous">
                {theme.direction === 'ltr' ? <GrStatusGood /> : <GrStatusGood />}
              </IconButton>
              כיסוי במקרה נזק/גניבה של הרכב השכור
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <IconButton aria-label="previous">
                {theme.direction === 'ltr' ? <GrStatusGood /> : <GrStatusGood />}
              </IconButton>
              דמי אי הגעה:  $ 50,00
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              <IconButton aria-label="previous">
                {theme.direction === 'ltr' ? <GrStatusGood /> : <GrStatusGood />}
              </IconButton>
              דמי ביטול: בהתאם לחוק הגנת הצרכן
            </Typography>

            <ButtonGroup variant="contained" sx={{ direction: 'ltr' }} className='allButtonGroup' >
              <Button variant="contained" className='buttonGroup' type={"submit"} onClick={increase}>+</Button>
              <Button variant="contained" className='buttonGroup'>{numOfProduct}</Button>
              <Button variant="contained" className='buttonGroup' type={"submit"} onClick={reduce}>-</Button>
            </ButtonGroup>

            <MenuItem key={"finalOrder"}>
              <Button variant="contained" className='buttonOrder' type={"submit"} onClick={() => addProductInClient(one)} >אני מעונין</Button>
            </MenuItem>

            <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                <IconButton aria-label="play/pause" variant="outlined" onClick={() => navigate(-1)}>
                  <KeyboardBackspaceIcon sx={{ height: 20, width: 20 }} />
                </IconButton>
                בחזרה לבחירת רכב
              </Typography>
            </Box>

            {user && user.role == "Admin" ?
              <Button onClick={deleteFromServer} color="inherit" startIcon={<DeleteIcon />} size="small"></Button>
              : ''}


          </CardContent>

        </Box>

        <CardMedia
          //width: 500
          component="img"
          sx={{
            margin: 'auto',
            display: 'block',
            maxWidth: '30%',
            maxHeight: '30%',
          }}
          image={one.imgUrl} alt={one.productName}
        />
      </Card>

    </div >
  );
}

export default ProductDetails;



