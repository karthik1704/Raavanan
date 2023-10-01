import { Fragment, useState } from 'react';
import { useLoaderData, Link, useNavigate } from '@remix-run/react';

import {
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  SwipeableDrawer,
  Typography,
} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { styled } from '@mui/material/styles';

const RootDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  '& > *': {
    margin: theme.spacing(1),
  },
  padding: '10px',
}));

const SwipeableDrawer1 = styled('div')(({ theme }) => ({
  backgroundColor: '#232f3e !important',
  color: 'white !important',
  height: '100vh'
}));

const AppDrawer = ({ isOpen, setIsOpen }) => {
  const { category } = useLoaderData();
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="left"
      open={isOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <SwipeableDrawer1>
        <RootDiv>
          <Typography>வணக்கம் !</Typography>
        </RootDiv>

        <Divider />
        <Box
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {category &&
              category.map((menu, index) => (
                <ListItem key={menu.id} disablePadding>
                  <ListItemButton component={Link} to={`/products/${menu.slug}`}>
                    <ListItemIcon sx={{minWidth: '30px'}}>
                      <img
                        src={menu.imageurl}
                        alt={menu.name}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </ListItemIcon>
                    <ListItemText>{menu.name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
          </List>

          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/terms">
                <ListItemText primary="கொள்கைகள்" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/about">
                <ListItemText primary="எங்களைப் பற்றி" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/contact">
                <ListItemText primary="தொடர்புக்கு" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Divider />
      </SwipeableDrawer1>
    </SwipeableDrawer>
  );
};

export default AppDrawer;
