import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch, useSelector } from "react-redux";
import { removeFromBasket, updateQty } from "./OrderSlice";
import * as React from 'react';
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ClearIcon from '@mui/icons-material/Clear';
import { Button, ButtonGroup } from '@mui/material';
import './ItemSmallBasket.css';



const ItemSmallBasket = ({ one }) => {
    let dispatch = useDispatch();

    const textSecondry=()=>{
        return `ימים: ${one.quantity} `
    }
    return (<div>

        <ListItem className="listItemStyle" sx={{ width: "300px" }}>

            <Button>
                <img src={one.imgUrl} alt={one.productName}  className='imgStyle' />
            </Button>
            <ListItemText
                primary={one.productName}
                secondary={textSecondry()}
            />
            <div> {one.price * one.quantity} $</div>
        </ListItem>
    </div>);
}

export default ItemSmallBasket;