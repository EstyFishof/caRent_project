import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector, useDispatch } from 'react-redux';
import ItemSmallBasket from './ItemSmallBasket';
import { useState, useEffect } from 'react';
import { setShowSmallBasket } from './OrderSlice'
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom";
import './SmallBasket.css';


const SmallBasket = () => {
    const handleClickOpen = () => {
    setOpen(true);
};
    let sumPrice = useSelector(state => state.order.sumPrice);
    let countProduct = useSelector(state => state.order.countProduct);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(true);
 let basket = useSelector(state => state.order.basket);
    let finalPrice = useSelector(state => state.order.finalPrice);
    const toggleDrawer = (newOpen) => () => {
        if (!newOpen)
            dispatch(setShowSmallBasket(true))
        setOpen(newOpen);
    };



    const DrawerList = (
        <Box sx={{ width: 300 ,ml:5}} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <h3 className='h4Style' > פרטי הזמנה </h3>
                {basket?.map(item =>
                    <ListItem key={item._id} disablePadding>
                        <ItemSmallBasket one={item} />
                    </ListItem>
                )}

            </List>
            <Divider />
            <h5 className='h4Style'>מס' ימי השכרה : {countProduct} </h5>
            <h4 className='h4Style'>סה"כ לתשלום: {sumPrice} $</h4>
        </Box>
    );
    return (
        <div>
            <IconButton aria-label="cart" onClick={toggleDrawer(true)} color="default">
                <ShoppingCartIcon />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList} 
                <MenuItem key={"finalOrder"}>
              <Button variant="contained" className='buttonOrder' type={"submit"} sx={{width:'100%'}}>
                <Link to={"/basket"} className='buttonLink' >להזמנה</Link></Button>
            </MenuItem>
            <MenuItem key={"login"}>
              <Button variant="contained" className='navBarButton' type={"submit"} sx={{width:'85%', ml:'7%'}} >
                <Link to={"/all"} className="buttonLink">אחורה </Link></Button>
            </MenuItem>

            </Drawer>
        </div>
    );
}

export default SmallBasket;
