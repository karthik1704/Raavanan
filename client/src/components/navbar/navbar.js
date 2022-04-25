import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import PrimaryMenu from './primary-menu';
import SearchBar from './search-bar';
import RaavananLogo from 'assets/images/logo/raavanan-logo.png';

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <img src={RaavananLogo} alt="raavanan angadi logo" />
          </Link>

          <SearchBar />
          <Box sx={{ flexGrow: 1 }} />
          <PrimaryMenu isAuthenticated={true} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};

export default Navbar;
