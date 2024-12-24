import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useCookies } from 'react-cookie';

const ActionDropdown = ({ onActionSelect, student }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [cookies] = useCookies(['token']);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (action) => {
    setAnchorEl(null);
    if (action) {
      onActionSelect(action); // Pass the selected action to the parent
    }
  };

  const isMoveBackToSGVPEnabled = cookies.token.update_data_credentials;

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
            <MenuItem onClick={() => handleClose('Show')}>Show</MenuItem>
          </p>
          {isMoveBackToSGVPEnabled && (
            <p className="text-gray-700 hover:bg-[#37AFE1] hover:text-white transition duration-300 cursor-pointer">
              <MenuItem
                onClick={() =>
                  isMoveBackToSGVPEnabled && handleClose('Move Back To SGVP')
                }
                disabled={!isMoveBackToSGVPEnabled}
              >
                Move Back To SGVP
              </MenuItem>
            </p>
          )}
        </ul>
      </Menu>
    </>
  );
};

export default ActionDropdown;
