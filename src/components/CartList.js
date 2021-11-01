import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import ShoppingCart  from '@mui/icons-material/ShoppingCart';
import {useStateValue} from '../StateProvider';
import BuyCard from './BuyCard';

export default function CartList() {
  const [{basket},dispatch] = useStateValue();   
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction="row"  spacing={2} zIndex={100}  >
      
      <div>
      <IconButton ref={anchorRef}

          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onMouseEnter={handleToggle}
          >
              <Badge badgeContent={basket?.length} color="error">
              <ShoppingCart style={{fontSize:"40px", color:"black"}} />
              </Badge>
       </IconButton> 
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
            
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
                  
              }}
            >
              <Paper sx={{backgroundColor:'transparent', boxShadow:'none'}}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                  
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
 
                  >
                   {basket?.map((item)=> 

                        <BuyCard key={item.id} product={item} margin={2}/>

                    )}  
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
