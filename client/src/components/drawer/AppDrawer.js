import { Fragment, useState } from 'react';

//import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';

//import { deepPurple } from '@mui/material/colors';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { MENUS } from '../../CONSTANTS';
import { toggleAppDrawer } from '../../data/actions/appAction';

import { styled } from '@mui/material/styles';
import './drawer.css';

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

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     '& > *': {
//       margin: theme.spacing(1),
//     },
//   },

//   purple: {
//     color: theme.palette.getContrastText(deepPurple[500]),
//     backgroundColor: deepPurple[500],
//   },
//   nested: {
//     paddingLeft: theme.spacing(4),
//   },
// }));

const AppDrawer = ({ theme, onToggleTheme, category }) => {
  const { drawerOpen } = useSelector((state) => state.appDrawer);
  const dispatch = useDispatch();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const { isAuthenticated } = useSelector((state) => state.auth);

  var anchors_dict = {};
  category.map((option) => {
    if (option.children.length > 0) {
      anchors_dict[option.name] = true;
    }
  });
  const [anchors, setAnchors] = useState(anchors_dict);
  let navigate = useNavigate();

  const handleClick = (menu) => {
    setAnchors((prevState) => ({ ...prevState, [menu]: !anchors[menu] }));
  };

  const handleParentClick = (menu) => {
    // setOpen(!open);
    navigate(menu);
    dispatch(toggleAppDrawer(false));
  };

  const toggleDrawer = (open, event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    dispatch(toggleAppDrawer(open));
  };

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="left"
      open={drawerOpen}
      onClose={(e) => toggleDrawer(false, e)}
      onOpen={(e) => toggleDrawer(true, e)}
    >
      <SwipeableDrawer1>
        <RootDiv>
          {/* <Avatar
          sx={{color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],}}
        className={classes.purple}>S</Avatar>
        <Typography variant="body1">SRBN Loves N! </Typography> */}
          <Typography>வணக்கம் !</Typography>
          {/* {(()=> {
          if (isAuthenticated) {
            return (
              <>
                <Button color="primary">Logout</Button>
              </>
            );
          } else {
            return (
              <>
                <Button color="primary">உள்நுழை</Button>
              </>
          )
        }
      })()} */}
        </RootDiv>

        <Divider />
        <div
          role="presentation"
          // onClick={(e) => toggleDrawer(false, e)}
          // onKeyDown={(e) => toggleDrawer(false, e)}
        >
          <List>
            {category.map((menu) => {
              return menu.children.length > 0 ? (
                //     <ListItem button component={Link} to={menu.link}>
                //    <ListItemIcon>
                //      <NewReleasesIcon />
                //    </ListItemIcon>
                //    <ListItemText primary={menu.name} />
                //  </ListItem>
                <Fragment key={menu.slug}>
                  <ListItem>
                    <ListItemIcon>
                      {/* <InboxIcon /> */}
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
                      {menu.children.map((option) => {
                        return (
                          <ListItem
                            button
                            sx={{ pl: 4 }}
                            component={Link}
                            to={option.slug}
                            key={option.slug}
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
                  to={menu.slug}
                >
                  <ListItemIcon>
                    {/* <InboxIcon /> */}
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
        {/* <List>
        <ListItem>
          <ListItemText primary="இருண்ட பயன்முறை" />
          <Switch
            checked={theme === 'light' ? false : true}
            onChange={onToggleTheme}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </ListItem>
      </List> */}
      </SwipeableDrawer1>
    </SwipeableDrawer>
  );
};

export default AppDrawer;
