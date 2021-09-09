/* eslint-disable react/jsx-wrap-multilines */
import { useState, useEffect, useRef } from 'react';

import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

// import AccountCircle from '@mui/icons-material/AccountCircle';
import { GoogleLogout } from 'react-google-login';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LockIcon from '@mui/icons-material/Lock';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import useDarkTheme from '../../hooks/useDarkTheme';
import useTopLoader from '../../hooks/useTopLoader';

import { API_URL, MENUS } from '../../CONSTANTS';
import AppDrawer from '../drawer/AppDrawer';
import { toggleAppDrawer } from '../../data/actions/appAction';

import RavananLogo from '../../asserts/raavanan logo png.png';
import { logoutUser } from '../../data/actions/loginActions';

import { event } from 'react-ga';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  [theme.breakpoints.up('xs')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    maxWidth: '100% !important',
  },
  [theme.breakpoints.down('md')]: {
    // marginLeft: theme.spacing(3),
    width: 'auto',
    marginRight: 0,
    marginBottom: '20px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '70%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
}));

// const useStyles = makeStyles((theme) => ({
//   links: {
//     color: '#fff',
//     textDecoration: 'none',
//   },
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     display: 'none',
//     [theme.breakpoints.up('sm')]: {
//       display: 'block',
//     },
//   },
//   search: {
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     '&:hover': {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     marginRight: theme.spacing(2),
//     marginLeft: 0,

//     display: 'flex',
//     flex: 1,
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//       maxWidth: '50% !important',
//     },
//     [theme.breakpoints.down('md')]: {
//       // marginLeft: theme.spacing(3),
//       width: 'auto',
//       marginRight: 0,
//       marginBottom: '20px',
//     },
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputRoot: {
//     color: 'inherit',
//     height: '40px',
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '70%',
//     [theme.breakpoints.up('md')]: {
//       width: '50ch',
//     },
//   },
//   sectionDesktop: {
//     display: 'none',
//     [theme.breakpoints.up('lg')]: {
//       display: 'flex',
//     },
//   },
//   sectionMobile: {
//     display: 'flex',
//     [theme.breakpoints.up('lg')]: {
//       display: 'none',
//     },
//   },

//   centerToolbar: {
//     display: 'none',
//     [theme.breakpoints.up('lg')]: {
//       backgroundColor: 'darkblue',
//       display: 'flex',
//       justifyContent: 'space-between',
//     },
//   },
//   rightToolbar: {
//     display: 'flex',
//     width: '100%',
//     flexWrap: 'wrap',
//     justifyContent: 'flex-end',
//   },
//   logoutBtn: {
//     boxShadow: 'none !important',
//   },
//   secMenu: {
//     background: 'darkblue !important',
//     fontSize: '12px !important',
//   },
//   subMenu: {
//     background: 'darkblue !important',
//     fontSize: '12px !important',
//     color: 'white',
//     '&:hover': {
//       backgroundColor: 'green !important',
//     },
//   },
//   MenuPopup: {
//     background: 'darkblue !important',
//   },
// }));

export default function Navbar() {
  const logout_url = `${API_URL}api/auth/logout/`;
  const [anchorEl, setAnchorEl] = useState(null);
  var anchors_dict = {};
  MENUS.map((option) => {
    if (option.submenu) {
      anchors_dict[option.menu] = false;
    }
  });
  const [anchors, setAnchors] = useState(anchors_dict);

  const [category, setCategory] = useState([]);
  const anchorRef = useRef(null);
  const [theme, onToggleTheme] = useDarkTheme();
  const [, onToggleTopLoader] = useTopLoader();
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);
  const loggedIn = login.loggedIn;
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  // console.log(state);
  // const isMenuOpen = Boolean(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  let history = useHistory();
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

    history.push('/');
  };

  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}api/category/`)
  //     .then((res) => setCategory(res.data.results));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    if (!login.loggedIn) return;

    if (cartItems.length > 0) {
      var carts = [];
      for (let i = 0; i < cartItems.length; i++) {
        carts.push({
          product: cartItems[i]['id'],
          price: cartItems[i]['price_id'],
          quantity: cartItems[i]['quantity'],
        });
      }
      axios.post(`${API_URL}api/sync_cart/`, carts).then((res) => {});
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
      <MenuItem component={Link} to="/orders">
        My Orders
      </MenuItem>
      {/* <MenuItem  onClick={logout}>Log out</MenuItem> */}
      <GoogleLogout
        sx={{
          boxShadow: 'none !important',
        }}
        icon={false}
        clientId="968634425555-s10i7vv331eqcnbq7doe4o3acl6puv8f.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      ></GoogleLogout>
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

    setAnchors((prevState) => ({ ...prevState, [menu]: !anchors[menu] }));
  };

  const handleToggle = (menu, e) => {
    console.log(e);
    setAnchorEl(e.currentTarget);
    setAnchors((prevState) => ({ ...prevState, [menu]: !anchors[menu] }));

    // setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        color={theme === 'dark' ? 'inherit' : 'primary'}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{
              mr: 2,
              display: {
                sm: 'block',
                md: 'none',
              },
            }}
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(toggleAppDrawer(true))}
            size="large"
          >
            <MenuIcon />
          </IconButton>

          <Link to="/">
            <img src={RavananLogo} alt="logo" height="80px" width="80px" />
          </Link>

          <Search sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: {
                xs: 'none',
                sm: 'flex',
              },
              width: '100%',
              flexWrap: 'wrap',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              aria-label={`${cartItems.length} product in cart`}
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

            {(() => {
              if (loggedIn) {
                return (
                  <>
                    {/* {login.user} */}
                    <div>
                      <Button
                        aria-label=" 4 product in cart"
                        color="inherit"
                        aria-haspopup="true"
                        onClick={handleProfileMenuClick}
                      >
                        {login.user.user && `${login.user.user.first_name}`}
                      </Button>
                      {renderMenu}
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <Button
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
                    </Button>
                  </>
                );
              }
            })()}
          </Box>

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
        <Toolbar sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>

        <Toolbar
          sx={{
            display: { sm: 'none', md: 'flex' },
            backgroundColor: 'darkblue',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {MENUS.map((menu, index) => {
              return menu.submenu ? (
                <>
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="split button"
                  >
                    <Button
                      sx={{
                        background: 'darkblue !important',
                        fontSize: '12px !important',
                      }}
                      component={Link}
                      to={menu.link}
                    >
                      {menu.menu}
                    </Button>
                    <Button
                      sx={{
                        background: 'darkblue !important',
                        fontSize: '12px !important',
                      }}
                      color="primary"
                      size="small"
                      aria-controls={
                        isMenuOpen ? 'split-button-menu' : undefined
                      }
                      aria-expanded={isMenuOpen ? 'true' : undefined}
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      onClick={(e) => handleToggle(menu.menu, e)}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>
                  <Popper
                    open={anchors[menu.menu]}
                    anchorEl={anchorEl}
                    role={undefined}
                    placement="bottom-start"
                    transition
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom' ? 'left top' : 'left bottom',
                        }}
                      >
                        <Paper
                          sx={{
                            background: 'darkblue !important',
                          }}
                        >
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu">
                              {menu.submenu.map((option, index1) => {
                                return (
                                  <MenuItem
                                    sx={{
                                      background: 'darkblue !important',
                                      fontSize: '12px !important',
                                      color: 'white',
                                      '&:hover': {
                                        backgroundColor: 'green !important',
                                      },
                                    }}
                                    key={option.menu}
                                    component={Link}
                                    to={option.link}
                                    // disabled={index === 2}
                                    // selected={index === selectedIndex}
                                    onClick={(event) =>
                                      handleMenuItemClick(menu.menu)
                                    }
                                  >
                                    {option.menu}
                                  </MenuItem>
                                );
                              })}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </>
              ) : (
                <>
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    ref={anchorRef}
                    aria-label="split button"
                  >
                    <Button
                      sx={{
                        background: 'darkblue !important',
                        fontSize: '12px !important',
                      }}
                      component={Link}
                      to={menu.link}
                    >
                      {menu.menu}
                    </Button>
                  </ButtonGroup>
                </>
              );
            })}
          </div>
          <div style={{ float: 'right' }}>
            <Button
              sx={{
                background: 'darkblue !important',
                fontSize: '12px !important',
              }}
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
              sx={{
                background: 'darkblue !important',
                fontSize: '12px !important',
              }}
              to="/about"
            >
              எங்களைப் பற்றி
            </Button>
            <Button
              color="inherit"
              onClick={onToggleTopLoader}
              sx={{
                background: 'darkblue !important',
                fontSize: '12px !important',
              }}
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
    </Box>
  );
}
