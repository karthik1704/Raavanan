//import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';
import FilterFramesIcon from '@material-ui/icons/FilterFrames';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import SmartphoneRoundedIcon from '@material-ui/icons/SmartphoneRounded';

import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { toggleAppDrawer } from '../../data/actions/appAction';
import { Button } from '@material-ui/core';

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
}));

const AppDrawer = ({ theme, onToggleTheme }) => {
  const { appDrawerOpen } = useSelector((state) => state.appUi);
  const dispatch = useDispatch();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const classes = useStyles();
  const login = useSelector((state) => state.login);
  
  const loggedIn = login.loggedIn;
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
        {(()=> {
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
      })()}
        
        
      </div>

      <Divider />
      <div
        role="presentation"
        onClick={(e) => toggleDrawer(false, e)}
        onKeyDown={(e) => toggleDrawer(false, e)}
      >
        <List>
          <ListItem button component={Link} to="/organic-foods">
            <ListItemIcon>
              <NewReleasesIcon />
            </ListItemIcon>
            <ListItemText primary="இயற்கை உணவு" />
          </ListItem>

          <ListItem button component={Link} to="/photo-frames">
            <ListItemIcon>
              <FilterFramesIcon />
            </ListItemIcon>
            <ListItemText primary="படச்சட்டகம்" />
          </ListItem>

          <ListItem button component={Link} to="/t-shirts">
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="சட்டை" />
          </ListItem>

          <ListItem button component={Link} to="/pillows">
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="தலையணை" />
          </ListItem>

          <ListItem button component={Link} to="/phone-cases">
            <ListItemIcon>
              <SmartphoneRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="கைபேசி உறை" />
          </ListItem>

          <ListItem button component={Link} to="/mugs">
            <ListItemIcon>
              <EmojiFoodBeverageIcon />
            </ListItemIcon>
            <ListItemText primary="தேநீர் கோப்பை" />
          </ListItem>

          <ListItem button component={Link} to="/stickers">
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="சுவரொட்டிகள்" />
          </ListItem>

          <ListItem button component={Link} to="/others">
            <ListItemIcon>
              <LocalMallIcon />
            </ListItemIcon>
            <ListItemText primary="இதர" />
          </ListItem>
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
