import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  Divider,
  Box,
  Grid2,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PendingIcon from '@mui/icons-material/Pending';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from 'react';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig';
import axios from 'axios';
import toast from 'react-hot-toast';

const DetailsCard = ({
  gatepasses,
  setGatepasses,
  selectedParentOption,
  selectedAdminOption,
  gatepass,
  onClose,
}) => {
  const [selectedGatepass, setSelectedGatepass] = useState(gatepass);
  const [anchorElParent, setAnchorElParent] = useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);
  const [parentOptions, setParentOptions] = useState([]);
  const [adminOptions, setAdminOptions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [remarksInput, setRemarksInput] = useState('');

  useEffect(() => {
    if (selectedGatepass.parent_approval_status === 'pending') {
      setParentOptions(['approved', 'disapproved']);
    } else if (selectedGatepass.parent_approval_status === 'approved') {
      setParentOptions(['pending', 'disapproved']);
    } else if (selectedGatepass.parent_approval_status === 'disapproved') {
      setParentOptions(['pending', 'approved']);
    }
  }, [selectedGatepass.parent_approval_status]);

  useEffect(() => {
    if (selectedGatepass.admin_approval_status === 'pending') {
      setAdminOptions(['approved', 'disapproved']);
    } else if (selectedGatepass.admin_approval_status === 'approved') {
      setAdminOptions(['pending', 'disapproved']);
    } else if (selectedGatepass.admin_approval_status === 'disapproved') {
      setAdminOptions(['pending', 'approved']);
    }
  }, [selectedGatepass.admin_approval_status]);

  const statusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'disapproved':
        return 'red';
      default:
        return 'orange';
    }
  };

  const handleMenuOpen = (event, type) => {
    if (type === 'parent') {
      setAnchorElParent(event.currentTarget);
    } else {
      setAnchorElAdmin(event.currentTarget);
    }
  };

  const handleMenuClose = (type) => {
    if (type === 'parent') {
      setAnchorElParent(null);
    } else {
      setAnchorElAdmin(null);
    }
  };

  const filterGatepassFromList = (
    selectedParentOption,
    selectedAdminOption,
    updatedBody,
  ) => {
    const filteredGatepasses = gatepasses.filter(
      (gp) => gp.gatepass_number !== updatedBody.gatepass_number,
    );
    if (
      updatedBody.parent_approval_status === selectedParentOption &&
      updatedBody.admin_approval_status === selectedAdminOption
    ) {
      filteredGatepasses.push(updatedBody);
      filteredGatepasses.sort(function (a, b) {
        return b.gatepass_number - a.gatepass_number;
      });
    }
    setGatepasses(filteredGatepasses);
  };

  const handleStatusChange = async (status, type) => {
    if (type === 'parent') {
      try {
        const updatedBody = {
          ...selectedGatepass,
          parent_approval_status: status,
        };
        const response = await axios.put(
          `${VITE_BACKEND_BASE_API}/gatepass/updateParentApproval`,
          {
            gatepass_number: updatedBody.gatepass_number,
            parent_approval_status: updatedBody.parent_approval_status,
            remarks: updatedBody.remarks,
          },
        );
        if (response.status === 200) {
          toast.success(`Admin Changed Parent Status to ${status}`);
          setSelectedGatepass(updatedBody);
          filterGatepassFromList(
            selectedParentOption,
            selectedAdminOption,
            updatedBody,
          );
        } else {
          console.error('Error in parent status update:');
          toast.error('Error! Try Again');
        }
      } catch (error) {
        console.error('Error in parent status update:', error);
        toast.error('Error! Try Again');
      } finally {
        handleMenuClose(type);
      }
    } else {
      try {
        const updatedBody = {
          ...selectedGatepass,
          admin_approval_status: status,
        };
        const response = await axios.put(
          `${VITE_BACKEND_BASE_API}/gatepass/updateAdminApproval`,
          {
            gatepass_number: updatedBody.gatepass_number,
            admin_approval_status: updatedBody.admin_approval_status,
            remarks: updatedBody.remarks,
          },
        );
        if (response.status === 200) {
          toast.success(`Changed Admin Status to ${status}`);
          setSelectedGatepass(updatedBody);
          filterGatepassFromList(
            selectedParentOption,
            selectedAdminOption,
            updatedBody,
          );
        } else {
          toast.error('Error Try Again');
        }
      } catch (error) {
        console.log('Error in admin status update:', error);
        toast.error('Error! Try Again');
      } finally {
        handleMenuClose(type);
      }
    }
  };

  const handleDialogToggle = () => setIsDialogOpen(!isDialogOpen);

  const handleSaveRemarks = async () => {
    try {
      const updatedBody = {
        ...selectedGatepass,
        remarks: remarksInput.trim(),
      };
      const response = await axios.put(
        `${VITE_BACKEND_BASE_API}/gatepass/updateAdminApproval`,
        {
          gatepass_number: updatedBody.gatepass_number,
          remarks: updatedBody.remarks,
        },
      );
      if (response.status === 200) {
        toast.success('Remarks updated successfully!');
        setSelectedGatepass(updatedBody);
      } else {
        toast.error('Error updating remarks.');
      }
    } catch (error) {
      console.log('Error updating remarks:', error);
      toast.error('Error updating remarks.');
    } finally {
      handleDialogToggle();
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 700,
        minWidth: 400,
        margin: 'auto',
        padding: 2,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: 3,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img
          src="/images/logo.jpg"
          alt="Logo"
          style={{ width: 50, height: 50, marginLeft: 8 }}
        />
        {/* Card Header */}
        <CardHeader
          title={`SGVP HOSTEL`}
          subheader={`College Student Gatepass`}
          sx={{ textAlign: 'center' }}
        />
        {/* Close Icon */}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Card Content */}
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <Grid2 item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Gatepass Number:
            </Typography>
            <Typography>{selectedGatepass.gatepass_number}</Typography>
          </Grid2>
          {/* PIN Number */}
          <Grid2 item xs={12}>
            <Typography variant="body2" color="textSecondary">
              PIN Number:
            </Typography>
            <Typography>{selectedGatepass.pin_number}</Typography>
          </Grid2>

          {/* Outgoing Time */}
          <Grid2 item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Outgoing Time:
            </Typography>
            <Typography variant="body1">
              {new Date(selectedGatepass.outgoing_timestamp).toLocaleString()}
            </Typography>
          </Grid2>

          {/* Permission Upto */}
          <Grid2 item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Permission Upto:
            </Typography>
            <Typography variant="body1">
              {new Date(
                selectedGatepass.permission_upto_timestamp,
              ).toLocaleString()}
            </Typography>
          </Grid2>

          {/* Created Time */}
          <Grid2 item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Created On:
            </Typography>
            <Typography variant="body1">
              {new Date(selectedGatepass.gatepass_created).toLocaleString()}
            </Typography>
          </Grid2>

          {/* Reason */}
          <Grid2 item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Reason:
            </Typography>
            <Typography variant="body1">{selectedGatepass.reason}</Typography>
          </Grid2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
          {/* Parent Approval Status */}
          <Grid2
            item
            xs={6}
            sx={{
              display: 'flex',
            }}
          >
            <Grid2>
              <Typography variant="body2" color="textSecondary">
                Parent Approval:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: statusColor(selectedGatepass.parent_approval_status),
                  display: 'flex',
                  alignItems: 'center',
                }}
                className="capitalize"
              >
                {selectedGatepass.parent_approval_status === 'approved' && (
                  <CheckCircleOutlineIcon sx={{ marginRight: 1 }} />
                )}
                {selectedGatepass.parent_approval_status === 'pending' && (
                  <PendingIcon sx={{ marginRight: 1 }} />
                )}
                {selectedGatepass.parent_approval_status === 'disapproved' && (
                  <HighlightOffIcon sx={{ marginRight: 1 }} />
                )}
                {selectedGatepass.parent_approval_status}
              </Typography>
            </Grid2>
            <Grid2>
              <IconButton onClick={(e) => handleMenuOpen(e, 'parent')}>
                <EditIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElParent}
                open={Boolean(anchorElParent)}
                onClose={() => handleMenuClose('parent')}
              >
                {parentOptions.map((status) => (
                  <MenuItem
                    key={status}
                    onClick={() => handleStatusChange(status, 'parent')}
                    className="capitalize"
                  >
                    {status}
                  </MenuItem>
                ))}
              </Menu>
            </Grid2>
          </Grid2>

          {/* Admin Approval Status */}
          <Grid2
            item
            xs={6}
            sx={{
              display: 'flex',
            }}
          >
            <Grid2>
              <Typography variant="body2" color="textSecondary">
                Admin Approval:
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: statusColor(selectedGatepass.admin_approval_status),
                  display: 'flex',
                  alignItems: 'center',
                }}
                className="capitalize"
              >
                {selectedGatepass.admin_approval_status === 'approved' && (
                  <CheckCircleOutlineIcon sx={{ marginRight: 1 }} />
                )}
                {selectedGatepass.admin_approval_status === 'pending' && (
                  <PendingIcon sx={{ marginRight: 1 }} />
                )}
                {selectedGatepass.admin_approval_status === 'disapproved' && (
                  <HighlightOffIcon sx={{ marginRight: 1 }} />
                )}
                {selectedGatepass.admin_approval_status}
              </Typography>
            </Grid2>
            <Grid2>
              <IconButton onClick={(e) => handleMenuOpen(e, 'admin')}>
                <EditIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElAdmin}
                open={Boolean(anchorElAdmin)}
                onClose={() => handleMenuClose('admin')}
                className="capitalize"
              >
                {adminOptions.map((status) => (
                  <MenuItem
                    key={status}
                    onClick={() => handleStatusChange(status, 'admin')}
                  >
                    {status}
                  </MenuItem>
                ))}
              </Menu>
            </Grid2>
          </Grid2>

          {/* Remarks */}
          {/* {selectedGatepass.remarks && <Grid2 item xs={12}>
            <Typography variant="body2" color="textSecondary">
              Remarks:
            </Typography>
            <Typography variant="body1">
              {selectedGatepass.remarks || "No remarks provided"}
            </Typography>
          </Grid2>} */}

          {/* Remarks */}
          <Grid2 item xs={12}>
            {selectedGatepass.remarks && (
              <Typography variant="body2" color="textSecondary">
                Remarks:
              </Typography>
            )}
            {selectedGatepass.remarks && (
              <Typography variant="body1">
                {selectedGatepass.remarks || 'No remarks available'}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ mt: 1 }}
              onClick={handleDialogToggle}
            >
              {selectedGatepass.remarks ? 'Update Remarks' : 'Add Remarks'}
            </Button>
          </Grid2>
        </div>
      </CardContent>
      {/* Dialog for Adding/Updating Remarks */}
      <Dialog open={isDialogOpen} onClose={handleDialogToggle}>
        <DialogTitle>
          {selectedGatepass.remarks ? 'Update Remarks' : 'Add Remarks'}
        </DialogTitle>
        <DialogContent className="mt-2">
          <TextField
            label="Remarks"
            multiline
            fullWidth
            rows={4}
            value={remarksInput}
            onChange={(e) => setRemarksInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogToggle} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveRemarks} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default DetailsCard;
