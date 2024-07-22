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
import { useLocation, useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import './Login.css'
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginInServer } from "./userApi";
import { userIn } from "./userSlice";
import { Controller } from "react-hook-form"
import { Outlet, Link } from "react-router-dom";
import { removeBasket } from '../order/OrderSlice';

export const Login = () => {
  let dispatch = useDispatch();
  let {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({

  });

  const login = async (data) => {
    try {

      let res = await loginInServer(data);

      alert("התחברת בהצלחה");
      dispatch(userIn(res.data));
      dispatch(removeBasket());
      navigate('/')
    } catch (err) {
      alert("אתה לא רשום בבקשה הירשם");
      navigate('/register')
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
        maxHeight: 600,
        marginTop: 20,
        flexGrow: 1,
      }}>
        <CardMedia
          sx={{ height: 150 }}
          image='../pic/7934918.jpg'
          title="green iguana"
        />

        <Box className="login" sx={{
          marginRight: 1,
          marginLeft: 4,
          display: 'flex'
          , flexWrap: 'wrap'
        }}>
          <div>
            <form onSubmit={handleSubmit(login)}>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <Controller
                  name="userName"
                  control={control}
                  render={({ field }) => <TextField id="outlined-basic" label="שם משתמש" variant="outlined" {...field} />
                  }
                />
              </Box>
              <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">סיסמה</InputLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) =>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      {...field}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  }
                />
                {errors.password && <span>{errors.password.message}</span>}
                <Box>
                  <Stack spacing={10} className='buttons' direction="row">
                  </Stack>
                </Box>
                <Box>
                  <Stack spacing={10} className='buttons' direction="row">
                    <Button variant="contained" className='button' type={"submit"} >כניסה</Button>
                  </Stack>
                </Box>
                <Typography variant="subtitle1">
                  <Link to={"/register"} className='linkRegister'>
                    עדין לא רשום? הירשם
                  </Link>
                </Typography>
              </FormControl>
            </form>
          </div>
        </Box>
      </Card>
    </div>

  )
}