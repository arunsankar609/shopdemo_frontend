import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const userLogout=()=>{
    localStorage.removeItem("ElectricUser")
    navigate("/login")
  }

  return (
    <>
      <AppBar position="static" sx={{backgroundColor:"green" }}>
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: 'none' }}}
          >
            <MenuIcon />
          </IconButton>
         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         <Link to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>  Electrickzz</Link>
          </Typography>
          <TextField label="Search"  size="small" sx={{ marginRight: 2,backgroundColor:'white',width:'550px', borderRadius: '20px'}} />
         <Link to="/home/cart" style={{ color: 'inherit', textDecoration: 'none' }}> <IconButton aria-label="cart" color="inherit" onClick={addToCart}>
            <ShoppingCartOutlinedIcon />
          </IconButton></Link>
          {cartCount > 0 && (
            <div style={{ backgroundColor: 'red', color: 'white', borderRadius: '50%', padding: '4px 8px', fontSize: '12px' }}>
              {cartCount}
            </div>
          )}
          <Typography variant="h6" component="div"  >
         <Link style={{ color: 'inherit', textDecoration: 'none' }} onClick={()=>{userLogout()}}>  Logout</Link>
          </Typography>
        </Toolbar>
        
      </AppBar>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
      >
        <List sx={{ width: 250 }}>
          <ListItem button onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handleDrawerToggle}>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem button onClick={handleDrawerToggle}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button onClick={handleDrawerToggle}>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
