
import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import logo from "../img/amdevnegro.svg"
import CartList from './CartList';


export default function Navbar() {

  return (

    <Box sx={{ flexGrow: 1, marginLeft:"5%",marginRight:"5%",position:"retative",display:"block", backgroundColor:"white", borderBottom:"5px solid grey" }}>
      <Box>
        <Toolbar>
          <Box>
            <img src={logo} height="40rem"  />
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
