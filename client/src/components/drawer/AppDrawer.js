//import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
// import { MENUS } from '../../CONSTANTS';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import FilterFramesIcon from '@material-ui/icons/FilterFrames';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import SmartphoneRoundedIcon from '@material-ui/icons/SmartphoneRounded';

import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { toggleAppDrawer } from '../../data/actions/appAction';
import { Button } from '@material-ui/core';

import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import './drawer.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
    },
  },

  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const AppDrawer = ({ theme, onToggleTheme, category }) => {
  const { appDrawerOpen } = useSelector((state) => state.appUi);
  const dispatch = useDispatch();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles();
  const login = useSelector((state) => state.login);
  
  const loggedIn = login.loggedIn;
  
  var anchors_dict = {}
  category.map((option) => {
    if(option.children.length > 0){
      anchors_dict[option.name] = true
      
    }
    
  })
  const [anchors, setAnchors] = useState(anchors_dict);
  let history = useHistory()

  const handleClick = (menu) => {
    
    setAnchors(prevState => ({ ...prevState, [menu]: !anchors[menu] }));
  };

  const handleParentClick = (menu) => {
    // setOpen(!open);
    history.push(menu);
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
      open={appDrawerOpen}
      onClose={(e) => toggleDrawer(false, e)}
      onOpen={(e) => toggleDrawer(true, e)}
    >
      <div className={classes.root}>
        {/* <Avatar className={classes.purple}>S</Avatar>
        <Typography variant="body1">SRBN Loves N! </Typography> */}
        <Typography>வணக்கம் !</Typography>
        {/* {(()=> {
          if (loggedIn) {
            return (
              <>
              <Button color="primary">
          Logout
        </Button>
              </>
            )
          
        } else {
          return (
            <>
            <Button color="primary">
          உள்நுழை
        </Button>
              </>
          )
        }
      })()} */}
        
        
      </div>

      <Divider />
      <div
        role="presentation"
        // onClick={(e) => toggleDrawer(false, e)}
        // onKeyDown={(e) => toggleDrawer(false, e)}
      >
        <List>
        {category.map((menu, index) => {
            return menu.children.length > 0 ? 
        //     <ListItem button component={Link} to={menu.link}>
        //    <ListItemIcon>
        //      <NewReleasesIcon />
        //    </ListItemIcon>
        //    <ListItemText primary={menu.name} />
        //  </ListItem>
        <>
                <ListItem   >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText button primary={menu.name} onClick={() => handleParentClick(menu.slug)}/> 
                {anchors[menu.name] ? <ExpandLess onClick={()=> handleClick(menu.name)}/> : <ExpandMore onClick={() => handleClick(menu.name)}/>}
                </ListItem>
                <Collapse in={anchors[menu.name]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {menu.children.map((option, index1) => {
                 return <ListItem button className={classes.nested} component={Link} to={option.slug} onClick={(e) => toggleDrawer(false, e)}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary={option.name}/>
                  </ListItem>
                })}
                </List>
                </Collapse>
        </>


            :
            <ListItem button component={Link} to={menu.slug}>
           <ListItemIcon>
           <InboxIcon />
           </ListItemIcon>
           <ListItemText primary={menu.name} />
         </ListItem>

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
      <List>
        <ListItem>
          <ListItemText primary="இருண்ட பயன்முறை" />
          <Switch
            checked={theme === 'light' ? false : true}
            onChange={onToggleTheme}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};

export default AppDrawer;
