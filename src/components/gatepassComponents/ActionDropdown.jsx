import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useCookies } from 'react-cookie';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PrintIcon from '@mui/icons-material/Print';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RestoreIcon from '@mui/icons-material/Restore';

const ActionDropdown = ({ onActionSelect, gatepass }) => {
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

  const isReentryEnabled =
    gatepass.parent_approval_status === 'approved' &&
    gatepass.admin_approval_status === 'approved' &&
    cookies.token.gatepass_approval_credential;
  const isGenerateEnabled =
    gatepass.parent_approval_status === 'approved' &&
    gatepass.admin_approval_status === 'approved' &&
    cookies.token.gatepass_approval_credential;
  const isApproveEnabled =
    gatepass.parent_approval_status === 'approved' &&
    gatepass.admin_approval_status !== 'approved' &&
    cookies.token.gatepass_approval_credential;
  const isDisApproveEnabled =
    gatepass.admin_approval_status !== 'disapproved' &&
    cookies.token.gatepass_approval_credential;

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
            <MenuItem onClick={() => handleClose('View')}>
              <OpenInNewIcon className="mr-2" />
              View
            </MenuItem>
          </p>
          {isApproveEnabled && (
            <p className="text-gray-700 hover:bg-[#37AFE1] hover:text-white transition duration-300 cursor-pointer">
              <MenuItem
                onClick={() => isApproveEnabled && handleClose('Approve')}
                disabled={!isApproveEnabled}
              >
                <CheckCircleOutlineIcon className="mr-2" />
                Approve
              </MenuItem>
            </p>
          )}
          {isGenerateEnabled && (
            <p className="text-gray-700 hover:bg-[#37AFE1] hover:text-white transition duration-300 cursor-pointer">
              <MenuItem
                onClick={() => isGenerateEnabled && handleClose('Generate')}
                disabled={!isGenerateEnabled}
              >
                <PrintIcon className="mr-2" />
                Generate
              </MenuItem>
            </p>
          )}
          {isDisApproveEnabled && (
            <p className="text-gray-700 hover:bg-[#37AFE1] hover:text-white transition duration-300 cursor-pointer">
              <MenuItem
                onClick={() => isDisApproveEnabled && handleClose('Disapprove')}
                disabled={!isDisApproveEnabled}
              >
                <HighlightOffIcon className="mr-2" />
                Disapprove
              </MenuItem>
            </p>
          )}
          {isReentryEnabled && (
            <p
              className={`text-gray-700 hover:bg-[#37AFE1] hover:text-white cursor-pointer transition duration-300`}
            >
              <MenuItem
                onClick={() => isReentryEnabled && handleClose('Re-entry')}
                disabled={!isReentryEnabled}
              >
                <RestoreIcon className="mr-2" />
                Re-entry
              </MenuItem>
            </p>
          )}
        </ul>
      </Menu>
    </>
  );
};

export default ActionDropdown;
