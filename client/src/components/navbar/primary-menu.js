import { Fragment } from 'react';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

import ProfileAvatar from './profile-avatar';

/**
 *
 * @param {Object} Props
 * @param {boolean} Props.isAuthenticated
 */

const PrimaryMenu = ({ isAuthenticated }) => {
  return (
    <Fragment>
      <Button
        sx={{ mr: 1 }}
        color="inherit"
        startIcon={
          <Badge badgeContent={4} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        }
      >
        Cart
      </Button>
      {!isAuthenticated && (
        <Button sx={{ mr: 1 }} color="inherit" startIcon={<PersonIcon />}>
          Login/Signup
        </Button>
      )}

      {isAuthenticated && <ProfileAvatar />}
    </Fragment>
  );
};

export default PrimaryMenu;
