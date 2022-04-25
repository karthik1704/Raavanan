import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

/**
 *
 * @param {Object} props
 * @param {null | Element} props.anchorEl
 * @param {Function} props.onCloseMenu
 * @returns
 */

const ProfileMenu = ({ anchorEl, onCloseMenu }) => {
  return (
    <Menu
      sx={{ mt: '45px' }}
      id="profile-menu-appbar"
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={onCloseMenu}
    >
      <MenuItem onClick={onCloseMenu}>
        <Typography textAlign="center">Profile</Typography>
      </MenuItem>
      <MenuItem onClick={onCloseMenu}>
        <Typography textAlign="center">Orders</Typography>
      </MenuItem>
      <MenuItem onClick={onCloseMenu}>
        <Typography textAlign="center">Logout</Typography>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;
