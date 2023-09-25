import {  useState,  useRef } from 'react';
import { useLoaderData, Link, useNavigate } from '@remix-run/react';
import { styled, alpha } from '@mui/material/styles';
import {
  AppBar,
  Button,
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  InputBase,
  Badge,
  Grid,
  MenuItem,
  Menu,
  MenuList,
  Toolbar,
  Paper,
  Popper,
} from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

// import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockIcon from '@mui/icons-material/Lock';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';




import AppDrawer from './drawer';


import RavananLogo from '~/assets/raavanan logo png.png';
import { SettingsInputComponentOutlined } from '@mui/icons-material';


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

export default function Nav() {
  const [anchorEl, setAnchorEl] = useState(null);
  var anchors_dict = {};

  const [anchors, setAnchors] = useState(anchors_dict);

  const {category} = useLoaderData();
  
  const anchorRef = useRef(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  let history = useNavigate();

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };


  const handleClose = (event) => {
    setAnchors(anchors_dict);
    setAnchorEl(null);
    setOpen(false);

    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
  };



 

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
        அடைவுகள்
      </MenuItem>
    
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
            onClick={() => setOpen(true) }
            size="large"
          >
            <MenuIcon />
          </IconButton>

          <Link to="/" style={{ width: '100%', textAlign: 'center' }}>
            <img src={RavananLogo} alt="logo" height="40px" width="200px" />
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
           

          </Box>
        </Toolbar>
        <Toolbar
          sx={{
            display: {
              sm: 'flex',
              lg: 'none',
            },
            justifyContent: {
              sm: 'center',
              md: 'center',
            },
            textAlign: 'center',
          }}
          // className={`${classes.sectionMobile} ${classes.centeroptionbar} `}
        >
          
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
           
            <Button
              color="inherit"
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
              sx={{
                background: '#232f3e !important',
                fontSize: '12px !important',
              }}
              component={Link}
              to="/contact"
            >
              தொடர்புக்கு
            </Button>
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
              {category && category.map((menu, index) => {
                return menu?.children?.length > 0 ? (
                  <Grid item xs={1.5} sm={1.5} key={menu.id}>
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
                        <img
                          src={menu.imageurl}
                          style={{ width: '40px', height: '40px' }}
                          alt={menu.name}
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
                                color: 'yellow !important',
                              },
                            }}
                            to={`/${menu.slug}`}
                          >
                            {menu.name}
                          </Button>
                         
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
                                          to={`products/${option.slug}`}
                                        
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
                      </Item>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item xs={1.5} sm={1.5} key={menu.id}>
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
                        <img
                          src={menu.imageurl}
                          style={{ width: '40px', height: '40px' }}
                          alt={menu.name}
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
                          to={`products/${menu.slug}`}
                        >
                          {menu.name}
                        </Button>
                      </Item>
                    </Box>
                  </Grid>
                );
              })}

    
            </Grid>
            
          </div>
        </Toolbar>
      </AppBar>

      {/* {renderMenu} */}

      <AppDrawer isOpen={open} setIsOpen={setOpen}
      />
    </Box>
  );
}
