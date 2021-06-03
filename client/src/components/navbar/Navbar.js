/* eslint-disable react/jsx-wrap-multilines */
import { useState, useEffect } from 'react';

import axios from 'axios';

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

import {useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { API_URL } from '../../CONSTANTS';

import useDarkTheme from '../../hooks/useDarkTheme';
import useTopLoader from '../../hooks/useTopLoader';

import AppDrawer from '../drawer/AppDrawer';
import { toggleAppDrawer } from '../../data/actions/appAction';

import RavananLogo from '../../asserts/raavanan_logo.png';
import { logoutUser } from '../../data/actions/loginActions';

import {useHistory} from 'react-router-dom';
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
   backgroundColor:'darkslategrey'
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
}));

export default function Navbar() {
  const logout_url = `${API_URL}api/auth/logout/`;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState([]);

  const [theme, onToggleTheme] = useDarkTheme();
  const [loading, onToggleTopLoader] = useTopLoader();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const loggedIn = login.loggedIn;
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  // console.log(state);
  const isMenuOpen = Boolean(anchorEl);
  let history = useHistory()
  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        color={theme === 'dark' ? 'inherit' : 'primary'}
      >
        {/* <Toolbar className={classes.sectionDesktop}>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            component={Link}
            to="/terms"
          >
            கொள்கைகள்
          </Button>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            component={Link}
            to="/about"
          >
            எங்களைப் பற்றி
          </Button>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            component={Link}
            to="/contact"
          >
            தொடர்புக்கு
          </Button>
        
          <div className={classes.grow} />

          {(()=> {
          if (loggedIn) {
            return (
              <>
              <Button
            color="inherit"
            onClick={logout}
          
          >
            Log out 
          </Button>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            
            component={Link}
            to="/orders"
          >
            
            {`${login.user.user.first_name}`}
          </Button>
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
            உள்நுழைய 
          </Button>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            startIcon={<AssignmentIndIcon />}
            component={Link}
            to="/register"
          >
            பதிவு செய்ய
          </Button></>)
          }
        })()}
          
        
        </Toolbar>
        
        */}
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
          {/* <div className={classes.grow} /> */}
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
              கூடை
            </Button>
           
            
   
            {(()=> {
          if (loggedIn) {
            return (
              <>
              {/* {login.user} */}
          <div>
            
       <Button aria-label=" 4 product in cart"
              color="inherit" aria-haspopup="true" onClick={handleClick}>
      
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
            உள்நுழைய 
          </Button>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            startIcon={<AssignmentIndIcon />}
            component={Link}
            to="/register"
          >
            பதிவு செய்ய
          </Button></>)
          }
        })()}

           


          </div>

          <div className={classes.sectionMobile}>
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
          {/* <Button color="inherit" component={Link} to="/new">
            புதிய வெளியீடு
          </Button> */}
          <Button color="inherit" component={Link} to="/organic-foods">
            இயற்கை உணவு
          </Button>
          <Button color="inherit" component={Link} to="/photo-frames">
            படச்சட்டகம்
          </Button>
          <Button color="inherit" component={Link} to="/t-shirts">
            சட்டை
          </Button>
      
          <Button color="inherit" component={Link} to="/phone-cases">
            கைபேசி உறை
          </Button>
          <Button color="inherit" component={Link} to="/mugs">
            தேநீர் கோப்பை
          </Button>
          <Button color="inherit" component={Link} to="/stickers">
            சுவரொட்டிகள்
          </Button>
          <Button color="inherit" component={Link} to="/others">
            இதர
          </Button>


          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            component={Link}
            to="/terms"
          >
            கொள்கைகள்
          </Button>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            component={Link}
            to="/about"
          >
            எங்களைப் பற்றி
          </Button>
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            component={Link}
            to="/contact"
          >
            தொடர்புக்கு
          </Button>

          
        </Toolbar>
      </AppBar>

      {/* {renderMenu} */}
      
      <AppDrawer theme={theme} onToggleTheme={onToggleTheme} />
    </div>
  );
}
