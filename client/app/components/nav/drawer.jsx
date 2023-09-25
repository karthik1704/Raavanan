import { Fragment, useState } from 'react';
import {useLoaderData, Link, useNavigate} from '@remix-run/react';

import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
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
}));



const AppDrawer = ({  isOpen, setIsOpen }) => {
    const {category} = useLoaderData();
  const iOS =
    typeof navigator !== 'undefined' &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
 

  var anchors_dict = {};
  category && category.forEach((option) => {
    if (option?.children?.length > 0) {
      anchors_dict[option.name] = true;
    }
  });
  const [anchors, setAnchors] = useState(anchors_dict);
  let history = useNavigate();

  const handleClick = (menu) => {
    setAnchors((prevState) => ({ ...prevState, [menu]: !anchors[menu] }));
  };

  const handleParentClick = (menu) => {
    setIsOpen(false)
    history.push(`/products/${menu}`);
  };

  const toggleDrawer = (open, event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open)
  };

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="left"
      open={isOpen}
      onClose={(e) => toggleDrawer(false, e)}
      onOpen={(e) => toggleDrawer(true, e)}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <SwipeableDrawer1>
        <RootDiv>
         
          <Typography>வணக்கம் !</Typography>
          
        </RootDiv>

        <Divider />
        <div
          role="presentation"
          
        >
          <List>
            {category && category.map((menu, index) => {
              return menu?.children?.length > 0 ? (
               
                <Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <img
                        src={menu.imageurl}
                        alt={menu.name}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      button
                      primary={menu.name}
                      onClick={() => handleParentClick(menu.slug)}
                    />
                    {anchors[menu.name] ? (
                      <ExpandLess onClick={() => handleClick(menu.name)} />
                    ) : (
                      <ExpandMore onClick={() => handleClick(menu.name)} />
                    )}
                  </ListItem>
                  <Collapse
                    in={anchors[menu.name]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {menu.children.map((option, index1) => {
                        return (
                          <ListItem
                            button
                            sx={{ pl: 4 }}
                            component={Link}
                            to={option.slug}
                            key={index1}
                            onClick={(e) => toggleDrawer(false, e)}
                          >
                            <ListItemIcon>
                              <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary={option.name} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Collapse>
                </Fragment>
              ) : (
                <ListItem
                  key={menu.slug}
                  button
                  component={Link}
                  to={`products/${menu.slug}`}
                  onClick={()=> setIsOpen(false)}
                >
                  <ListItemIcon>
                    <img
                      src={menu.imageurl}
                      alt={menu.name}
                      style={{ width: '20px', height: '20px' }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItem>
              );
            })}
          </List>

          <Divider />
          <List>
            <ListItem button component={Link} to="/terms">
              <ListItemText primary="கொள்கைகள்" />
            </ListItem>

            <ListItem button component={Link} to="/about">
              <ListItemText primary="எங்களைப் பற்றி" />
            </ListItem>

            <ListItem button component={Link} to="/contact">
              <ListItemText primary="தொடர்புக்கு" />
            </ListItem>
          </List>
        </div>
        <Divider />
       
      </SwipeableDrawer1>
    </SwipeableDrawer>
  );
};

export default AppDrawer;
