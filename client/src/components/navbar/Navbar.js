/* eslint-disable react/jsx-wrap-multilines */
import { Fragment, useState, useEffect, useRef } from 'react';

// import customAxios from '../../navigation/NavigationService';
import customAxios from '../../navigation/NavigationService';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
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
import Grid from '@mui/material/Grid';

import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import useDarkTheme from '../../hooks/useDarkTheme';
import useTopLoader from '../../hooks/useTopLoader';

import { API_URL } from '../../CONSTANTS';
import AppDrawer from '../drawer/AppDrawer';
//import { toggleAppDrawer } from '../../data/actions/appAction';
// import { logoutUser } from '../../data/actions/loginActions';

import { toggleDrawer } from '../../features/appDrawer/appDrawerSlice';
import { logoutUser } from '../../features/auth/authSlice';

import RavananLogo from '../../asserts/raavanan logo png.png';
import truck from '../../asserts/images/delivery-truck.png';

import './navbar.css';

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

const Item = styled(Paper)(({ theme }) => ({
  // ...theme.typography.body2,
  textAlign: 'center',
  color: 'inherit',
  // color: theme.palette.text.secondary,
  backgroundColor: '#131921',
  height: 60,
  lineHeight: '60px',
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

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  var anchors_dict = {};

  const [anchors, setAnchors] = useState(anchors_dict);

  const [category, setCategory] = useState([]);
  const anchorRef = useRef(null);
  const [theme, onToggleTheme] = useDarkTheme();
  const [, onToggleTopLoader] = useTopLoader();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const loggedIn = isAuthenticated;
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  // console.log(state);
  // const isMenuOpen = Boolean(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  let navigate = useNavigate();
  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // Show Top Loader when menu clicked
  const showTopLoader = () => {
    onToggleTopLoader(true);
  };

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
    dispatch(logoutUser(''));
    navigate('/');
  };

  useEffect(() => {
    customAxios
      .get(`${API_URL}api/category/`)
      .then((res) => setCategory(res.data.results));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    var anchors_dict = {};
    category.map((option) => {
      if (option.children) {
        anchors_dict[option.name] = false;
      }
    });
    setAnchors(anchors_dict);
  }, [category]);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (cartItems.length > 0) {
      var carts = [];
      for (var i = 0; i < cartItems.length; i++) {
        carts.push({
          product: cartItems[i]['id'],
          price: cartItems[i]['price_id'],
          quantity: cartItems[i]['quantity'],
        });
      }
      customAxios.post(`${API_URL}api/sync_cart/`, carts).then((res) => {});
    }
  }, [isAuthenticated, cartItems]);

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
      <MenuItem component={Link} to="/orders" onClick={handleMenuClose}>
        அடைவுகள்
      </MenuItem>
      {/* <MenuItem  onClick={logout}>Log out</MenuItem> */}
      <GoogleLogout
        sx={{
          boxShadow: 'none !important',
          color: 'black !important',
        }}
        className="logout"
        icon={false}
        clientId="968634425555-s10i7vv331eqcnbq7doe4o3acl6puv8f.apps.googleusercontent.com"
        buttonText="வெளியேறு"
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
    setAnchorEl(e.currentTarget);
    setAnchors((prevState) => ({ ...prevState, [menu]: !anchors[menu] }));

    // setOpen((prevOpen) => !prevOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        // color={theme === 'dark' ? 'inherit' : 'primary'}
        sx={{
          background: '#131921',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{
              mr: { md: 2 },
              display: {
                sm: 'block',
                md: 'none',
              },
            }}
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(toggleDrawer(true))}
            size="large"
          >
            <MenuIcon />
          </IconButton>

          <Link to="/" style={{ textAlign: 'center' }}>
            <img src={RavananLogo} alt="logo" height="40px" width="150px" />
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
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: 'flex',
                sm: 'none',
                md: 'none',
              },
            }}
          />
          <IconButton
            sx={{
              fontSize: '12px !important',
              display: { xs: 'flex', sm: 'none' },
            }}
            aria-label={`${cartItems.length} product in cart`}
            color="inherit"
            component={Link}
            to="/CartPage"
          >
            <Badge badgeContent={cartItems.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Toolbar
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
              sx={{ fontSize: '12px !important' }}
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
              கூடை
            </Button>

            {(() => {
              if (isAuthenticated) {
                return (
                  <>
                    <div>
                      <IconButton
                        sx={{ fontSize: '12px !important' }}
                        aria-label="profile"
                        color="inherit"
                        aria-haspopup="true"
                        onClick={handleProfileMenuClick}
                        style={{ fontWeight: '400', marginTop: '2px' }}
                      >
                        <Avatar alt={user?.first_name} src={user?.avatar}>
                          {user && user.first_name[0]}
                        </Avatar>
                      </IconButton>
                      {renderMenu}
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    {' '}
                    <Button
                      color="inherit"
                      sx={{ fontSize: '12px !important' }}
                      onClick={showTopLoader}
                      startIcon={<LockIcon />}
                      component={Link}
                      to="/login"
                    >
                      உள் நுழைய
                    </Button>
                    <Button
                      color="inherit"
                      onClick={showTopLoader}
                      sx={{ fontSize: '12px !important' }}
                      startIcon={<AssignmentIndIcon />}
                      component={Link}
                      to="/register"
                    >
                      பதிய
                    </Button>
                  </>
                );
              }
            })()}
          </Toolbar>
        </Toolbar>

        <Toolbar
          sx={{ display: { xs: 'flex', sm: 'none' }, justifyContent: 'center' }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="தேடுக..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar>

        <Toolbar
          sx={{
            display: { xs: 'none', sm: 'none', md: 'flex' },
            backgroundColor: '#232f3e',
            minHeight: '40px !important',
            justifyContent: 'space-between',
          }}
        >
          <div>
            {/* {category.map((menu, index) => {
              return menu.children.length > 0 ? (
                <Fragment key={index}>
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="split button"
                  >
                    <Button
                      component={Link}
                      sx={{
                        background: '#232f3e !important',
                        fontSize: '12px !important',
                      }}
                      to={`/${menu.slug}`}
                    >
                      {menu.name}
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      aria-controls={
                        isMenuOpen ? 'split-button-menu' : undefined
                      }
                      aria-expanded={isMenuOpen ? 'true' : undefined}
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      sx={{
                        background: '#232f3e !important',
                        fontSize: '12px !important',
                      }}
                      onClick={(e) => handleToggle(menu.name, e)}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>
                  <Popper
                    open={anchors[menu.name]}
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
                        <Paper sx={{ background: '#232f3e !important' }}>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu">
                              {menu.children.map((option, index1) => {
                                return (
                                  <MenuItem
                                    sx={{
                                      background: '#232f3e !important',
                                      fontSize: '12px !important',
                                      color: 'white',
                                      '&:hover': {
                                        backgroundColor: 'green !important',
                                      },
                                    }}
                                    key={option.name}
                                    component={Link}
                                    to={`/${option.slug}`}
                                    // disabled={index === 2}
                                    // selected={index === selectedIndex}
                                    onClick={(event) =>
                                      handleMenuItemClick(menu.name)
                                    }
                                  >
                                    {option.name}
                                  </MenuItem>
                                );
                              })}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Fragment>
              ) : (
                <Fragment key={index}>
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    ref={anchorRef}
                    aria-label="split button"
                  >
                    <Button
                      component={Link}
                      sx={{
                        background: '#232f3e !important',
                        fontSize: '12px !important',
                      }}
                      //  to={menu.link}
                      to={`/${menu.slug}`}
                    >
                      {menu.name}
                    </Button>
                  </ButtonGroup>
                </Fragment>
              );
            })} */}
            <Button
              color="inherit"
              onClick={showTopLoader}
              component={Link}
              sx={{
                background: '#232f3e !important',
                fontSize: '12px !important',
              }}
              to="terms"
            >
              கொள்கைகள்
            </Button>
            <Button
              color="inherit"
              onClick={showTopLoader}
              component={Link}
              sx={{
                background: '#232f3e !important',
                fontSize: '12px !important',
              }}
              to="about"
            >
              எங்களைப் பற்றி
            </Button>
            <Button
              color="inherit"
              onClick={showTopLoader}
              sx={{
                background: '#232f3e !important',
                fontSize: '12px !important',
              }}
              component={Link}
              to="contact"
            >
              தொடர்புக்கு
            </Button>
          </div>

          <div style={{ float: 'right' }}>
            {/* <Button
              color="inherit"
              onClick={showTopLoader}
              component={Link}
              sx={{
                background: '#232f3e !important',
                fontSize: '12px !important',
              }}
              to="/terms"
            >
              கொள்கைகள்
            </Button>
            <Button
              color="inherit"
              onClick={showTopLoader}
              component={Link}
              sx={{
                background: '#232f3e !important',
                fontSize: '12px !important',
              }}
              to="/about"
            >
              எங்களைப் பற்றி
            </Button>
            <Button
              color="inherit"
              onClick={showTopLoader}
              sx={{
                background: '#232f3e !important',
                fontSize: '12px !important',
              }}
              component={Link}
              to="/contact"
            >
              தொடர்புக்கு
            </Button> */}
            {/* <Button
              color="inherit"
              onClick={showTopLoader}
              component={Link}
              // className={classes.secMenu}
              sx={{
                background: '#232f3e !important',
                fontSize: '12px !important',
              }}
              className="blink_me"
              // to="/terms"
              to="."
            >
              <img src={truck} alt="truck icon" />
              &nbsp; தமிழ்நாடு முழுவதும் தூதஞ்சல் இலவசம்
            </Button> */}
          </div>
        </Toolbar>

        <Toolbar
          sx={{
            display: { xs: 'none', sm: 'none', md: 'flex' },
            // backgroundColor: '#232f3e',
            minHeight: '40px !important',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '100%' }}>
            <Grid container spacing={0.1}>
              {category.map((menu, index) => {
                return menu.children.length > 0 ? (
                  <Grid key={menu.slug} item xs={1.5} sm={1.5}>
                    <Box
                      xs={3}
                      sm={3}
                      sx={{
                        p: 1,
                        gap: 1,
                      }}
                    >
                      <Item
                        key={index}
                        elevation={24}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          height: 'auto',
                        }}
                      >
                        {/* <Fragment key={index} > */}
                        <img
                          src={menu.imageurl}
                          alt={menu.name}
                          style={{ width: '40px', height: '40px' }}
                        />
                        <span
                          style={{
                            lineHeight: '0px',
                          }}
                        >
                          <Button
                            color="inherit"
                            component={Link}
                            sx={{
                              background: 'none !important',
                              fontSize: '11px !important',
                              padding: '0px !important',
                              color: 'white',
                              marginTop: '2px',
                              '&:hover': {
                                // backgroundColor: '#131921 !important',
                                color: 'yellow !important',
                              },
                            }}
                            to={`/${menu.slug}`}
                          >
                            {menu.name}
                          </Button>
                          {/* <img src="https://www.flaticon.com/" title="Flaticon"/> */}
                          {/* <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="split button"
                  >
                    <Button
                      component={Link}
                      sx={{
                        background: '#232f3e !important',
                        fontSize: '12px !important',
                      }}
                      to={`/${menu.slug}`}
                    >
                      {menu.name}
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      aria-controls={
                        isMenuOpen ? 'split-button-menu' : undefined
                      }
                      aria-expanded={isMenuOpen ? 'true' : undefined}
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      sx={{
                        background: '#232f3e !important',
                        fontSize: '12px !important',
                      }}
                      onClick={(e) => handleToggle(menu.name, e)}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>
                   */}
                          <Button
                            color="inherit"
                            size="small"
                            aria-controls={
                              isMenuOpen ? 'split-button-menu' : undefined
                            }
                            aria-expanded={isMenuOpen ? 'true' : undefined}
                            aria-label="select merge strategy"
                            aria-haspopup="menu"
                            sx={{
                              background: 'none !important',
                              fontSize: '11px !important',
                              padding: '0px !important',
                              color: 'white',
                              marginTop: '2px',
                              minWidth: '20px',
                              '&:hover': {
                                color: 'yellow !important',
                              },
                            }}
                            onClick={(e) => handleToggle(menu.name, e)}
                          >
                            <ArrowDropDownIcon />
                          </Button>
                        </span>
                        <Popper
                          open={anchors[menu.name]}
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
                                  placement === 'bottom'
                                    ? 'left top'
                                    : 'left bottom',
                              }}
                            >
                              <Paper sx={{ background: '#232f3e !important' }}>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList id="split-button-menu">
                                    {menu.children.map((option, index1) => {
                                      return (
                                        <MenuItem
                                          sx={{
                                            background: '#232f3e !important',
                                            fontSize: '12px !important',
                                            color: 'white',
                                            '&:hover': {
                                              color: 'yellow !important',
                                            },
                                          }}
                                          key={option.name}
                                          component={Link}
                                          to={`/${option.slug}`}
                                          // disabled={index === 2}
                                          // selected={index === selectedIndex}
                                          onClick={(event) =>
                                            handleMenuItemClick(menu.name)
                                          }
                                        >
                                          {option.name}
                                        </MenuItem>
                                      );
                                    })}
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                        {/* </Fragment> */}
                      </Item>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item key={menu.slug} xs={1.5} sm={1.5}>
                    <Box
                      xs={3}
                      sm={3}
                      sx={{
                        p: 1,
                        gap: 1,
                      }}
                    >
                      <Item
                        key={menu.slug}
                        elevation={24}
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          height: 'auto',
                        }}
                      >
                        {/* <Fragment key={index} > */}
                        <img
                          src={menu.imageurl}
                          alt={menu.name}
                          style={{ width: '40px', height: '40px' }}
                        />
                        <Button
                          color="inherit"
                          component={Link}
                          sx={{
                            background: 'none !important',
                            fontSize: '11px !important',
                            padding: '0px !important',
                            color: 'white',
                            marginTop: '2px',
                            '&:hover': {
                              color: 'yellow !important',
                            },
                          }}
                          to={`/${menu.slug}`}
                        >
                          {menu.name}
                        </Button>
                      </Item>
                    </Box>
                  </Grid>
                );
              })}

              {/* <Grid item xs={1.5} sm={1.5}>
          
            <Box
            xs={3} sm={3}
              sx={{
                p: 1,                
                gap: 1,
              }}
            >
              
                <Item  key={elevation} elevation={24}>
                 kk
                </Item>
              
              
            </Box> 
          
         </Grid>


        ))} */}
            </Grid>
            {/* {category.map((menu, index) => {
              return menu.children.length > 0 ? (
                <Fragment key={index}>
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="split button"
                  >
                    <Button
                      component={Link}
                      sx={{
                        background: '#232f3e !important',
                        fontSize: '12px !important',
                      }}
                      to={`/${menu.slug}`}
                    >
                      {menu.name}
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      aria-controls={
                        isMenuOpen ? 'split-button-menu' : undefined
                      }
                      aria-expanded={isMenuOpen ? 'true' : undefined}
                      aria-label="select merge strategy"
                      aria-haspopup="menu"
                      sx={{
                        background: '#232f3e !important',
                        fontSize: '12px !important',
                      }}
                      onClick={(e) => handleToggle(menu.name, e)}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                  </ButtonGroup>
                  <Popper
                    open={anchors[menu.name]}
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
                        <Paper sx={{ background: '#232f3e !important' }}>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu">
                              {menu.children.map((option, index1) => {
                                return (
                                  <MenuItem
                                    sx={{
                                      background: '#232f3e !important',
                                      fontSize: '12px !important',
                                      color: 'white',
                                      '&:hover': {
                                        backgroundColor: 'green !important',
                                      },
                                    }}
                                    key={option.name}
                                    component={Link}
                                    to={`/${option.slug}`}
                                    // disabled={index === 2}
                                    // selected={index === selectedIndex}
                                    onClick={(event) =>
                                      handleMenuItemClick(menu.name)
                                    }
                                  >
                                    {option.name}
                                  </MenuItem>
                                );
                              })}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </Fragment>
              ) : (
                <Fragment key={index}>
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    ref={anchorRef}
                    aria-label="split button"
                  >
                    <Button
                      component={Link}
                      sx={{
                        background: '#232f3e !important',
                        fontSize: '12px !important',
                      }}
                      //  to={menu.link}
                      to={`/${menu.slug}`}
                    >
                      {menu.name}
                    </Button>
                  </ButtonGroup>
                </Fragment>
              );
            })} */}
          </div>
        </Toolbar>
      </AppBar>

      {/* {renderMenu} */}

      <AppDrawer
        theme={theme}
        onToggleTheme={onToggleTheme}
        category={category}
      />
    </Box>
  );
}
