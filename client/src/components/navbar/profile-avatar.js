import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import ProfileMenu from './profile-menu';

const ProfileAvatar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenProfileMenu = (evt) => {
    setAnchorElUser(evt.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton sx={{ p: 0 }} onClick={handleOpenProfileMenu}>
        <Avatar
          alt="Karthi"
          src="/broken-image.jpg"
          sx={{ width: 44, height: 44 }}
        />
      </IconButton>
      <ProfileMenu
        anchorEl={anchorElUser}
        onCloseMenu={handleCloseProfileMenu}
      />
    </Box>
  );
};

export default ProfileAvatar;
