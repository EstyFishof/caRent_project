
import { getAllProducts } from "./ProductApi";
import { useSelector } from "react-redux";
import { Product } from "./Product";
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './ProductList.css';



const ProductsList = () => {
    let [arrOfProducts, setArrOfProducts] = useState([]);
    let [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        getAllProducts(
            // 1,12,""
            ).then(res => {
            console.log(res);
            setArrOfProducts(res.data);
            handleClick(SlideTransition, "The connection to the server was successful")();
        })
            .catch(err => {
                console.log(err);
                handleClick(SlideTransition, "Failed to connect to the server")();
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [1])

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
        successMessage: "",
    });

    const handleClick = (Transition, message) => () => {
        setState({
            open: true,
            Transition,
            successMessage: message,
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };
    console.log(arrOfProducts);
    return (
        <div className="background">
            {state.open && <Snackbar
                open={state.open}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                message={state.successMessage}
                key={state.Transition.name}
                autoHideDuration={5000}
            />}
      
            <div className="key_car">
                {/* setTimeout(()=> */}
                {isLoading && <h1>בדרך לקבל את המפתח...</h1>}
                {isLoading && <img src="../pic/key_car.GIF" />} 
                {/* )(2000) */}
            </div> 
           
            <Box className="allProducts" sx={{ flexGrow: 4 }} >
                <Grid container spacing={15}>
                    {arrOfProducts.map((item) => {
                        
                        return (
                            item.type=="a"?
                            <Grid item xs={8} sm={5} lg={2.7} key={item._id}>
                            <Product key={item._id} Product one={item} />
                        </Grid>
                        :""
                        )
                    })}
                </Grid>
            </Box>
        </div>




    );
}

export default ProductsList;