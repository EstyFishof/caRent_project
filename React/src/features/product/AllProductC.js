
import { getAllProducts } from "./ProductApi";
import { useSelector } from "react-redux";
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {ProductC } from "./ProductC";
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import './AllProductC.css';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// export const Pagination=()=> {
//     return (
//       <Stack spacing={2}>
//         <Pagination count={10} size="small" />
//       </Stack>
//     );
//   }


const AllProductC = () => {
    let [arrOfProducts, setArrOfProducts] = useState([]);
    const category = useSelector((state) => state.product.selectedCategory);
    let [currentPage, setCurrentPage] = useState(1);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getAllProducts(
            // currentPage,12,""
            ).then(res => {
            setArrOfProducts(res.data);
            handleClick(SlideTransition, "The connection to the server was successful")();
        })
            .catch(err => {
                handleClick(SlideTransition, "Failed to connect to the server")();
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [currentPage])

    const handlePageChange = (event, value) => {
        setCurrentPage(value);

    } 


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
   

return(
   <div>
    <ImageList className="images" >
        {  arrOfProducts.map((item) => (item.type=="b" && (item.category == category || category == 'all') ?<ProductC one={item}/>:""))}
         </ImageList>

{!isLoading&& < Stack spacing={1}sx={{ mt: 6 }}>
<Pagination className="pagination"
//  className="pagination"
style={{marginBottom:"7%",display:"flex",color:"red",marginLeft:"45%",marginLeft:"45%"}}
  count={6}
  page={currentPage}
  onChange={handlePageChange}
  renderItem={(item) => (
    <PaginationItem
      slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
      {...item}
    />
  )}
/>
</Stack>} 
     </div>  
);
}

export default AllProductC;



