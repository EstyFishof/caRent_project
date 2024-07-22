
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { saveOrderInServer } from "./OrderApi";
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Outlet, Link } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { Product } from "../product/Product"
import { ProductC } from '../product/ProductC';
import ProductDetails from '../product/ProductDetails';
import './OrderBasket.css';

export const Basket = () => {
    let basket = useSelector(state => state.order.basket);
    let sumPrice = useSelector(state => state.order.sumPrice);
    let countProduct = useSelector(state => state.order.countProduct);
    const user = useSelector((state) => state.user.currentUser);
    let dispatch = useDispatch();
    const adreesOrder = " rtcyvb";

    const saveOrder = async (data) => {
        try {
            let res = await saveOrderInServer(basket, user, adreesOrder);
            alert("  תודה שהזמנתם CARENT 🚗   ");
        } catch (err) {
            alert("  שליחת ההזמנה נכשלה נסה במועד מאוחר יותר");
            navigate('/register')
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let navigate = useNavigate();
    return (
        countProduct > 0 ?
            <>
                <Card sx={{ display: 'flex' }} className='orderCard'>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography component="div" variant="h5">
                            פרטי הזמנה
                        </Typography>
                        <Card >
                            <Box sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}>

                                {basket.map(item => (
                                    <div key={item._id}>
                                        <ProductC
                                            one={item}
                                            displayType={'basket'}
                                            numOfProductBasket={basket.findIndex(i => i._id === item._id) != -1 ? basket[basket.findIndex(i => i._id === item._id)].quantity : 1}
                                        />
                                    </div>
                                ))}
                            </Box>
                        </Card>

                        <Typography component="div" variant="h7" className='h7'>
                            מס' ימי השכרה: {countProduct}
                        </Typography>
                        <Typography component="div" variant="h7" className='h7'>
                            סה"כ לתשלום: {sumPrice}$
                        </Typography>
                        <div className='bottom2'>
                            <IconButton aria-label="play/pause" variant="outlined" onClick={() => navigate(-1)}>
                                <KeyboardBackspaceIcon sx={{ height: 20, width: 20 }} />
                            </IconButton>

                            <React.Fragment>

                                <p>
                                    {!user ? <Link to={"/login"} >שים לב! אתה לא רשום בבקשה הירשם
                                    </Link> :

                                        <Button variant="contained" className='buttonOrder' onClick={() => { handleClickOpen() }}>
                                            אישור הזמנה
                                        </Button>
                                    }
                                </p>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    PaperProps={{
                                        component: 'form',
                                        onSubmit: (event) => {
                                            event.preventDefault();
                                            const formData = new FormData(event.currentTarget);
                                            const formJson = Object.fromEntries(formData.entries());
                                            const email = formJson.email;
                                            console.log(email);
                                            handleClose();

                                        },
                                    }}
                                >

                                    <DialogTitle sx={{ direction: 'rtl' }}>אישור הזמנה</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            הכנס כאן את הכתובת המלאה שלך
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            required
                                            margin="dense"
                                            id="name"
                                            name="email"
                                            label="כתובת למשלוח ההזמנה"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>ביטול</Button>
                                        <Button type="submit"
                                            onClick={() => { saveOrder(basket, user.token) }}>אישור </Button>
                                    </DialogActions>
                                </Dialog>
                            </React.Fragment>
                        </div>
                    </Box>
                </Card>



            </>
            :
            <Card sx={{ display: 'flex' }} className='orderCard'>
                <Box
                // sx={{ display: 'flex', flexDirection: 'column' }}
                >
                    <Typography component="div" variant="h5" className='emptyOrder'>
                        עדין לא הזמנת רכב

                    </Typography>
                    <Typography component="div" variant="h6" className='emptyOrder'>
                        מעונין לבחור רכב שיתאים לך בדיוק?

                    </Typography>



                    <Button variant="contained" className='buttonOrder' >
                        <Link to={"/"} className="buttonLink">לבחור רכב</Link>
                    </Button>

                </Box>
            </Card>
    );
}











