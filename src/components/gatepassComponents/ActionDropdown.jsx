import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ActionDropdown = ({ onActionSelect, gatepass }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    setAnchorEl(null);
    if (action) {
      onActionSelect(action); // Pass the selected action to the parent
    }
  };

  const isReentryEnabled =
    gatepass.parent_approval_status === 'approved' &&
    gatepass.admin_approval_status === 'approved';

  return (
    <>
      <IconButton onClick={handleClick}>
        <ArrowDropDownIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ul>
          <p className="text-gray-700 hover:bg-[#37AFE1] hover:text-white transition duration-300 cursor-pointer">
            <MenuItem onClick={() => handleClose('Approve')}>Approve</MenuItem>
          </p>
          <p className="text-gray-700 hover:bg-[#37AFE1] hover:text-white transition duration-300 cursor-pointer">
            <MenuItem onClick={() => handleClose('Disapprove')}>
              Disapprove
            </MenuItem>
          </p>
          <p
            className={`text-gray-700 hover:bg-[#37AFE1] hover:text-white cursor-pointer transition duration-300`}
          >
            <MenuItem
              onClick={() => isReentryEnabled && handleClose('Re-entry')}
              disabled={!isReentryEnabled}
            >
              Re-entry
            </MenuItem>
          </p>
        </ul>
      </Menu>
    </>
  );
};

export default ActionDropdown;
