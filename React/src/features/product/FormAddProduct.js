import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Outlet, Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useState } from 'react';
import { addProduct } from './ProductApi';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";


const schema = yup.object().shape({
  productName: yup.string().min(3, "שם המוצר לפחות 3 תוים").required("שדה חובה"),
 
});


export const AddProductAdmin = () => {

  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const { control, handleSubmit, register, formState: { errors },
   reset } = useForm({ mode: "addProductInClient", resolver: yupResolver(schema) });


  const addProductInClient = async (data) => {
    console.log('d', data);
    try {

      let res = await addProduct(data);
      alert(" המוצר נוסף ");

    } catch (err) {
      alert("התרחשה שגיאה");

    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  let navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();

  };

  return (
    <div>
      <Card sx={{
        p: 0,
        margin: 'auto',
        maxWidth: 300,
        maxHeight: 1000,
        marginTop: 20,
        marginBottom:12,
        flexGrow: 1,
      }}>
        <CardMedia 
          sx={{ height: 200 }}
          image='../pic/form.jpg'
          title="green iguana"
          backgroundColor="rgb(251, 98, 98)"
        />

        <Box className="login" sx={{
          marginRight: 1,
          marginLeft: 4,
          display: 'flex'
          , flexWrap: 'wrap'
        }}>
          <div>
            <form onSubmit={handleSubmit(addProductInClient)}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Controller
                  name="productName"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="שם המוצר " variant="outlined" {...field} />}
                  onChange={(event) =>
                    setProductName(event.target.value)
                  }

                />
                   <FormHelperText>{errors.productName?.message}</FormHelperText>
                <Controller
                  name="seats"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="מקומות" variant="outlined" {...field} />
                }
                />

                <Controller
                  name="suitcases"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="מזוודות  " variant="outlined" {...field} />
                }
                />
                <Controller
                  name="bags"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="תיקים" variant="outlined" {...field} />
                }
                />
                <Controller
                  name="imgUrl"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" defaultValue={"../pic/small.jpg"} label="src :תמונה " variant="outlined" {...field} />
                }
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="מחיר " variant="outlined" {...field} />}
                  onChange={(event) =>
                    setPrice(event.target.value)
                  }
                />
                <FormHelperText>{errors.price?.message}</FormHelperText>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => <TextField id="outlined-basic" label="סוג (a/b)" variant="outlined" {...field} />
                  }
                  />
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => <TextField id="outlined-basic" label="קטגוריה" variant="outlined" {...field} />
                  }
                  />
              </Box>
              <FormControl sx={{ mb:20, width: '25ch' }} variant="outlined">
                <Box>
                  <Stack spacing={3} className='buttons' direction="row">
                    <Button variant="contained" className='button' type={"submit"}>הוסף מוצר</Button>
                  </Stack>
                </Box>
                <Box>
                  <Stack spacing={3} className='buttons' direction="row">
                    <Typography variant="subtitle1" color="text.secondary" >
                      <Link to={"/"} >
                        <IconButton aria-label="settings">
                          <ExitToAppIcon />
                        </IconButton>
                      </Link>
                     לכל המוצרים
                    </Typography>
                  </Stack>
                </Box>
              </FormControl>
            </form>
          </div>
        </Box>

      </Card>
    </div>

  )
}
