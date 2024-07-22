import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {userOut} from './features/user/userSlice'
import {  setSelectedCategory } from "./features/product/ProductSlice";
import './NavBar.css';
import './features/product/Product.css';
import { Outlet, Link } from "react-router-dom";
import { current } from '@reduxjs/toolkit';
import ProductSlice from './features/product/ProductSlice';
import { removeBasket } from './features/order/OrderSlice';


const ResponsiveAppBar = (currentUser) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = useSelector((state) => state.user.currentUser);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = (page = null) => {
    setAnchorElNav(null);
    page && navigate(page.href);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  

    const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);
    const Admin = useSelector((state) => state.Admin);

    const handleClickAll = () => {
      dispatch(setSelectedCategory('all'));
      navigate('/all')
    }

    const handleOpenAdminMenu = (event) => {
      setAnchorElAdmin(event.currentTarget);
    };

    const handleCloseAdminMenu = () => {
      setAnchorElAdmin(null);
    };
    const handleLogout = () => {
      alert("  לשרותך תמיד CARENT 🚗");
      dispatch(userOut());
      dispatch(removeBasket());
    };



  return (
    <AppBar className='NavBar'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           <Link to={"/"}> 
           <img src="./pic/7934918.jpg" width={190}
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
               </Link>

          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >

              <MenuItem key={"home"}>
                <Typography textAlign="center"><Link to={"/home"} className="boxLink">אודות</Link></Typography>
              </MenuItem>
              <MenuItem key={"all"}>
                <Typography textAlign="center" 
               onClick={handleClickAll}
                >
                  <Link className="boxLink">כל הרכבים</Link>
                  </Typography>
              </MenuItem>
              <MenuItem key={"/"}>
                <Typography textAlign="center"><Link to={"/"} className="boxLink"> בחר רכב</Link></Typography>
              </MenuItem>

              <p className='user'>{!user &&!Admin ?
                <MenuItem key={"login"}>
                  <Typography textAlign="center"><Link to={"/login"} className="boxLink">כניסה</Link></Typography>
                </MenuItem>
                : ''}</p>

              <p className='user'>{!user &&!Admin ? 
                <MenuItem key={"register"}>
                  <Typography textAlign="center"><Link to={"/register"} className="boxLink">הרשמה</Link></Typography>
                </MenuItem>
                : ''}</p>
           
              <p className='admin'>{user && user.role=="Admin" ?
                <MenuItem key={"addProduct"}>
                  <Typography textAlign="center"><Link to={"/addProduct"} className="boxLink"> הוסף מוצר</Link></Typography>
                </MenuItem>
                : ''}</p>

            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >


            <img src="./pic/7934918.jpg" width={200}
              sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          </Typography >

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <MenuItem key={"home"}>
              <Typography textAlign="center"><Link to={"/home"} className="navBarLink">אודות</Link></Typography>
            </MenuItem>
            <MenuItem key={"all"}>
              <Typography textAlign="center" onClick={handleClickAll}><Link className="navBarLink">כל הרכבים</Link></Typography>
            </MenuItem>
            <MenuItem key={"/"}>
              <Typography textAlign="center"><Link to={"/"} className="navBarLink">  בחר רכב</Link></Typography>
            </MenuItem>
       
            <p className='user'>{!user &&!Admin ?
            <MenuItem key={"login"}>
              <Button variant="contained" className='navBarButton' type={"submit"} ><Link to={"/login"} className="buttonLink">כניסה</Link></Button>
            </MenuItem>
              : ''}</p> 
            <p className='user'>{!user &&!Admin ?
            <MenuItem key={"register"}>
              <Button variant="contained" className='navBarButton' type={"submit"} ><Link to={"/register"} className="buttonLink">הרשמה</Link></Button>
            </MenuItem>
             : ''}</p> 
               <p className='admin'>{user && user.role=="Admin" ? 
            <MenuItem key={"addProduct"}>
              <Button variant="contained" className='navBarButton' type={"submit"} ><Link to={"/addProduct"} className="buttonLink"> הוסף מוצר</Link></Button>
            </MenuItem>
              : ''}</p> 

          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <p className='user'>{user ? "hello" + " " + user.userName : 'אורח'}</p>
               
                <Avatar className='user' alt={user ? user.userName : 'אורח'} src='./pic/1254.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <Typography textAlign="center">
                <MenuItem key={"logout"}>
                  <Typography textAlign="center"><Link to={"/"} className="boxLink" onClick={handleLogout}> יציאה</Link></Typography>
                </MenuItem>
                <MenuItem key={"cart"}>
                  <Typography textAlign="center"><Link to={"/basket"} className="boxLink">סל קניות</Link></Typography>
                </MenuItem>
              </Typography>
            </Menu>
          </Box>
        </Toolbar>
      </Container>

    </AppBar>
  );
}
export default ResponsiveAppBar;




























