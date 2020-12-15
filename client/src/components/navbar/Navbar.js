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

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import LockIcon from '@material-ui/icons/Lock';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { API_URL } from '../../CONSTANTS';

import useDarkTheme from '../../hooks/useDarkTheme';
import useTopLoader from '../../hooks/useTopLoader';

import AppDrawer from '../drawer/AppDrawer';
import { toggleAppDrawer } from '../../data/actions/appAction';

import RavananLogo from '../../asserts/raavanan logo.png';

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
    width: '100%',
    display: 'flex',
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
      // marginLeft: theme.spacing(3),
      width: 'auto',
      marginRight: 0,
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
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
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
    margin: 'auto',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [category, setCategory] = useState([]);

  const [theme, onToggleTheme] = useDarkTheme();
  const [loading, onToggleTopLoader] = useTopLoader();
  const dispatch = useDispatch();

  const isMenuOpen = Boolean(anchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}api/category/`)
  //     .then((res) => setCategory(res.data.results));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

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
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        color={theme === 'dark' ? 'inherit' : 'primary'}
      >
        <Toolbar className={classes.sectionDesktop}>
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
          {/* <Button color="inherit">மென்பொருள் பதிவிறக்கம் செய்ய</Button>
          <Button color="inherit">Track Orders</Button>
          */}
          <div className={classes.grow} />
          <Button
            color="inherit"
            onClick={onToggleTopLoader}
            startIcon={<LockIcon />}
            disabled
          >
            உள்நுழைய / பதிவு செய்ய
          </Button>
        </Toolbar>
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
            <img src={RavananLogo} alt="logo"  height="130px" width="130px" />
          </Link>
          {/* <Typography className={classes.title} variant="h6" noWrap>
            இராவணன் அங்காடி
          </Typography> */}

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
          <div className={classes.sectionDesktop}>
            <Button
              aria-label="New Fav"
              color="inherit"
              startIcon={
                <Badge badgeContent={0} color="secondary">
                  <FavoriteIcon />
                </Badge>
              }
              disabled
            >
              விருப்ப பட்டியல்
            </Button>
            <Button
              aria-label=" 4 product in cart"
              color="inherit"
              startIcon={
                <Badge badgeContent={0} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              }
              disabled
            >
              கூடை
            </Button>
            <Button
              aria-label=" offers"
              color="inherit"
              startIcon={
                <Badge badgeContent={0} color="secondary">
                  <LocalOfferIcon />
                </Badge>
              }
              disabled
            >
              சலுகை
            </Button>

            <Button
              aria-label="Dark Mode"
              color="inherit"
              startIcon={<Brightness4Icon />}
              onClick={() => onToggleTheme()}
            >
              இருண்ட பயன்முறை
            </Button>

            {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
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
          <Button color="inherit" component={Link} to="/new">
            புதிய வெளியீடு
          </Button>
          <Button color="inherit" component={Link} to="/photo-frames">
            படச்சட்டகம்
          </Button>
          <Button color="inherit" component={Link} to="/t-shirts">
            சட்டை
          </Button>
          <Button color="inherit" component={Link} to="/pillows">
            தலையணை
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
        </Toolbar>
      </AppBar>

      {renderMenu}
      <AppDrawer theme={theme} onToggleTheme={onToggleTheme} />
    </div>
  );
}
