/* eslint-disable react/jsx-wrap-multilines */
import { useState, useEffect } from 'react';

import axios from 'axios';
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
// import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import { GoogleLogout } from 'react-google-login';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LockIcon from '@material-ui/icons/Lock';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import MenuList from '@material-ui/core/MenuList';
import {useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { API_URL, MENUS } from '../../CONSTANTS';

import useDarkTheme from '../../hooks/useDarkTheme';
import useTopLoader from '../../hooks/useTopLoader';

import AppDrawer from '../drawer/AppDrawer';
import { toggleAppDrawer } from '../../data/actions/appAction';

import RavananLogo from '../../asserts/raavanan logo png.png';
import { logoutUser } from '../../data/actions/loginActions';

import {useHistory} from 'react-router-dom';
import { event } from 'react-ga';
const useStyles = makeStyles((theme) => ({
  links: {
    color: '#fff',
    textDecoration: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    
    display: 'flex',
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
      maxWidth: '50% !important',
    },
    [theme.breakpoints.down('sm')]: {
      // marginLeft: theme.spacing(3),
      width: 'auto',
      marginRight: 0,
      marginBottom:'20px'
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',  
    height:'40px'  
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '70%',    
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  
  centerToolbar: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      backgroundColor:'darkblue',
     display: 'flex',
    justifyContent: 'space-between'
    },
   
  },
  rightToolbar: {
  display: 'flex',
width: '100%',
flexWrap: 'wrap',
justifyContent: 'flex-end',
  },
  logoutBtn:{
    
    boxShadow:'none !important'
  },
  secMenu:{
    background:'darkblue !important',
    fontSize:'12px !important',
    
    
  },
  subMenu:{
    background:'darkblue !important',
    fontSize:'12px !important',
    color:'white',
    '&:hover': {
      backgroundColor: "green !important",
   },
  },
  MenuPopup:{
    background:'darkblue !important',
  }
  
}));

export default function Navbar() {
  const logout_url = `${API_URL}api/auth/logout/`;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  var anchors_dict = {}
  MENUS.map((option) => {
    if(option.submenu){
      anchors_dict[option.menu] = false
      
    }
    
  })
  const [anchors, setAnchors] = useState(anchors_dict);
  
  
  const [category, setCategory] = useState([]);
  const anchorRef = React.useRef(null);
  const [theme, onToggleTheme] = useDarkTheme();
  const [loading, onToggleTopLoader] = useTopLoader();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const loggedIn = login.loggedIn;
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  // console.log(state);
  // const isMenuOpen = Boolean(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  let history = useHistory()
  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleClose = (event) => {
    setAnchors(anchors_dict);
    setAnchorEl(null);
    setOpen(false);
    
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
  };
  const logout = () => {
    // axios.post(logout_url, {
      
    //   })
    //   .then((response) => {
    //     dispatch(logoutUser(response.data));
    //   }, (error) => {
    //     console.log(error);
    //   });
      dispatch(logoutUser(''));
      
      history.push("/")
  };

  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}api/category/`)
  //     .then((res) => setCategory(res.data.results));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
   
    if(!login.loggedIn)
      return;
      
    if(cartItems.length > 0){
      var carts = []
      for(var i=0;i<cartItems.length;i++){
        carts.push({
          "product" : cartItems[i]['id'],
          "price" : cartItems[i]['price_id'],
          "quantity": cartItems[i]['quantity']
        })
      }
      axios
      .post(`${API_URL}api/sync_cart/`,carts)
      .then((res) => {
        
      });
    }
    
      
        
  }, [login, cartItems]);
 

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem  component={Link} to="/orders">My Orders</MenuItem>
      {/* <MenuItem  onClick={logout}>Log out</MenuItem> */}
      <GoogleLogout icon={false} 
      className={classes.logoutBtn}
      clientId="968634425555-s10i7vv331eqcnbq7doe4o3acl6puv8f.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>
    </Menu>
  );

  const handleClick = (event) => {
    
    setAnchorEl(event.currentTarget);
    
    
  };
  const handleProfileMenuClick = (event) => {
    
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
    
  };

  const handleMenuItemClick = (menu) => {
    // setSelectedIndex(index);
    
    setAnchors(prevState => ({ ...prevState, [menu]: !anchors[menu] }));
  };

  const handleToggle = (menu, e) => {
    console.log(e);
    setAnchorEl(e.currentTarget);
    setAnchors(prevState => ({ ...prevState, [menu]: !anchors[menu] }));
    
    // setOpen((prevOpen) => !prevOpen);
  };


  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        color={theme === 'dark' ? 'inherit' : 'primary'}
      >
       
        <Toolbar>
          <IconButton
            edge="start"
            className={`${classes.menuButton} ${classes.sectionMobile}`}
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(toggleAppDrawer(true))}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/">
            <img src={RavananLogo} alt="logo"  height="80px" width="80px" />
          
          </Link>
          

          <div className={`${classes.search} ${classes.sectionDesktop}`}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={`${classes.sectionDesktop}  ${classes.rightToolbar}`}>
            
            <Button
              aria-label=" 4 product in cart"
              color="inherit"
              component={Link}
              to="/CartPage"
              startIcon={
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              }
              
            >
              Cart
            </Button>
           
            
   
            {(()=> {
          if (loggedIn) {
            return (
              <>
              {/* {login.user} */}
          <div>
            
       <Button aria-label=" 4 product in cart"
              color="inherit" aria-haspopup="true" onClick={handleProfileMenuClick}>
      
      {login.user.user &&(`${login.user.user.first_name}`) }
      </Button>
      {renderMenu}
      
      
    </div>
              </>
            )
          } else {
            return (<> <Button
            color="inherit"
            onClick={onToggleTopLoader}
            startIcon={<LockIcon />}
            component={Link}
            to="/login"
          >
            Sign In 
          </Button>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            startIcon={<AssignmentIndIcon />}
            component={Link}
            to="/register"
          >
            Sign Up
          </Button></>)
          }
        })()}

           


          </div>

          {/* <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show 4 new Favorite"
              color="inherit"
              disabled
            >
              <Badge badgeContent={0} color="secondary">
                <FavoriteIcon />
              </Badge>
            </IconButton>

            <IconButton
              aria-label=" 4 product in cart"
              color="inherit"
              disabled
            >
              <Badge badgeContent={0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label=" Offers" color="inherit" disabled>
              <Badge badgeContent={0} color="secondary">
                <LocalOfferIcon />
              </Badge>
            </IconButton>
          </div>
         */}
        
        </Toolbar>
        <Toolbar className={classes.sectionMobile}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>

        <Toolbar
          className={`${classes.sectionDesktop} ${classes.centerToolbar}`}
        >
          
          <div>
          
      
          {MENUS.map((menu, index) => {
         
          return menu.submenu ? 
            <>
            <ButtonGroup variant="contained" color="primary"  aria-label="split button">
            <Button 
             component={Link}
             className={classes.secMenu}
             to={menu.link}
            >{menu.menu}</Button>
          <Button
            color="primary"
            size="small"
            aria-controls={isMenuOpen ? 'split-button-menu' : undefined}
            aria-expanded={isMenuOpen ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            className={classes.secMenu}
            onClick={(e) => handleToggle(menu.menu, e)}
           
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={anchors[menu.menu]} anchorEl={anchorEl} role={undefined} placement='bottom-start' transition>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'left top' : 'left bottom',
              }}
            >
              <Paper className={classes.MenuPopup}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {menu.submenu.map((option, index1) => {
                      
                      return <MenuItem
                        key={option.menu}
                        component={Link}
                        className={classes.subMenu}
                        to={option.link}
                        // disabled={index === 2}
                        // selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(menu.menu)}
                      >
                        {option.menu}
                      </MenuItem>
                    })}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </>
          
          
                 
         : 
            <>
            <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
            <Button 
             component={Link}
             className={classes.secMenu}
             to={menu.link}
            >{menu.menu}</Button>
            </ButtonGroup>
            </>
          
               

      
          })}

</div>
              <div style={{float:'right'}}>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            component={Link}
            className={classes.secMenu}
            to="/terms"
          >
            கொள்கைகள்
          </Button>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            component={Link}
            className={classes.secMenu}
            to="/about"
          >
           எங்களைப் பற்றி
          </Button>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            className={classes.secMenu}
            component={Link}
            to="/contact"
          >
            தொடர்புக்கு
          </Button>
          
          </div>

          
        </Toolbar>
      </AppBar>

      {/* {renderMenu} */}
      
      <AppDrawer theme={theme} onToggleTheme={onToggleTheme} />
    </div>
  );
}
