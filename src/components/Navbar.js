import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from "../img/Bejamas.svg"
import CartList from './CartList';

export default function Navbar() {

  return (

    <Box sx={{ flexGrow: 1, marginX:"2%", heigth:"100px",  position:"retative",display:"block", backgroundColor:"white", borderBottom:"5px solid grey" }}>
      <Box>
        <Toolbar style={{paddingLeft:"0px", paddingRight:"0px"}}>
          <Box sx={{height:"100px", alignItems:"center", display:"flex"}}>
            <img src={logo} height="21.55px"  />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: 'flex' } }}>
          <CartList />
          </Box>
        </Toolbar>
      </Box>
    </Box>
  );
}
