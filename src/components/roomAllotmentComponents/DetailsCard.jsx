import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Divider, Box, IconButton } from '@mui/material';
import './css/DetailsCard.css';
import { UpdateDialog } from './UpdateDialog.jsx';
import { useCookies } from 'react-cookie';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid2,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';
import toast from 'react-hot-toast';
import AssignRoomAndBedDialog from './AssignRoomAndBedDialog.jsx';

const DetailsCard = ({
  roomAllotment,
  setRoomAllotment,
  selectedOption,
  setSelectedOption,
  fetchRooms,
  bed,
  onClose,
}) => {
  const [selectedBed, setSelectedBed] = useState(bed);
  const [deAllocateLoading, setDeAllocateLoading] = useState(false);
  const [removeBedLoading, setRemoveBedLoading] = useState(false);
  const [assignRoomAndBedDialogOpen, setAssignRoomAndBedDialogOpen] =
    useState(false);

  const [cookies] = useCookies(['token']);

  const handleDeallocateBed = async () => {
    // Add logic to handle deallocating the bed
    // console.log('De-Allocate Bed clicked', selectedBed);
    try {
      setDeAllocateLoading(true);
      const response = await axios.delete(
        `${VITE_BACKEND_BASE_API}/roomAllotment/deAllocateRoomAndBed`,
        {
          params: { bed_number: selectedBed.bed_number },
        },
      );
      if (response.status === 200) {
        toast.success(`Bed ${selectedBed.bed_number} De-Allocated`);
        setSelectedBed({
          ...selectedBed,
          pin_number: null,
          student_full_name: null,
        });
        fetchRooms();
      } else {
        toast.error('Error!');
      }
    } catch (error) {
      console.log('Error de-allocating bed', error);
      toast.error('Error!');
    } finally {
      setDeAllocateLoading(false);
      onClose();
    }
  };

  const handleRemoveBed = async () => {
    // Add logic to handle removing the bed
    // console.log('Remove Bed clicked', selectedBed);
    try {
      setRemoveBedLoading(true);
      const response = await axios.delete(
        `${VITE_BACKEND_BASE_API}/roomAllotment/deleteBed`,
        {
          params: { bed_number: selectedBed.bed_number },
        },
      );
      if (response.status === 200) {
        toast.success(`Bed ${selectedBed.bed_number} Removed`);
        fetchRooms();
      } else {
        toast.error('Error!');
      }
    } catch (error) {
      console.log('Error removing bed', error);
      toast.error('Error!');
    } finally {
      setRemoveBedLoading(false);
      onClose();
    }
  };

  const handleAssignRoomAndBed = () => {
    // Add logic to handle assigning a room and bed
    // console.log('Assign Room & Bed clicked', selectedBed);
    setAssignRoomAndBedDialogOpen(true);
  };

  const isDeAllocateBedEnabled = selectedBed.pin_number !== null;
  const isRemoveBedEnabled = selectedBed.pin_number === null;
  const isAssignRoomAndBedEnabled = selectedBed.pin_number === null;

  return (
    <>
      <Card
        sx={{
          maxWidth: 700,
          minWidth: 500,
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
            subheader={`${selectedOption} Room Allotment`}
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
                PIN Number:
              </Typography>
              <Typography>{selectedBed.pin_number || '__________'}</Typography>
            </Grid2>

            <Grid2 item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Student Name:
              </Typography>
              <Typography>
                {selectedBed.student_full_name || '____________'}
              </Typography>
            </Grid2>

            <Grid2 item xs={12}>
              <Typography variant="body2" color="textSecondary">
                Room Number:
              </Typography>
              <Typography variant="body1">{selectedBed.room_number}</Typography>
            </Grid2>

            <Grid2 item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Bed Number:
              </Typography>
              <Typography variant="body1">{selectedBed.bed_number}</Typography>
            </Grid2>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
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
                  color: statusColor(selectedBed.parent_approval_status),
                  display: 'flex',
                  alignItems: 'center',
                }}
                className="capitalize"
              >
                {selectedBed.parent_approval_status === 'approved' && (
                  <CheckCircleOutlineIcon sx={{ marginRight: 1 }} />
                )}
                {selectedBed.parent_approval_status === 'pending' && (
                  <PendingIcon sx={{ marginRight: 1 }} />
                )}
                {selectedBed.parent_approval_status === 'disapproved' && (
                  <HighlightOffIcon sx={{ marginRight: 1 }} />
                )}
                {selectedBed.parent_approval_status}
              </Typography>
            </Grid2>
            {isUpdateDialogEnabled && (
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
            )}
          </Grid2>

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
                  color: statusColor(selectedBed.admin_approval_status),
                  display: 'flex',
                  alignItems: 'center',
                }}
                className="capitalize"
              >
                {selectedBed.admin_approval_status === 'approved' && (
                  <CheckCircleOutlineIcon sx={{ marginRight: 1 }} />
                )}
                {selectedBed.admin_approval_status === 'pending' && (
                  <PendingIcon sx={{ marginRight: 1 }} />
                )}
                {selectedBed.admin_approval_status === 'disapproved' && (
                  <HighlightOffIcon sx={{ marginRight: 1 }} />
                )}
                {selectedBed.admin_approval_status}
              </Typography>
            </Grid2>
            {isUpdateDialogEnabled && (
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
            )}
          </Grid2>

          {isUpdateDialogEnabled && (
            <Grid2 item xs={12}>
              {selectedBed.remarks && (
                <Typography variant="body2" color="textSecondary">
                  Remarks:
                </Typography>
              )}
              {selectedBed.remarks && (
                <Typography variant="body1">
                  {selectedBed.remarks || 'No remarks available'}
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ mt: 1 }}
                onClick={handleDialogToggle}
              >
                {selectedBed.remarks ? 'Update Remarks' : 'Add Remarks'}
              </Button>
            </Grid2>
          )}
        </div> */}
        </CardContent>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            padding: 2,
            gap: 3,
          }}
        >
          {isDeAllocateBedEnabled && (
            <Button
              variant="outlined"
              color="warning"
              onClick={handleDeallocateBed}
              disabled={!isDeAllocateBedEnabled}
              sx={{
                display: 'flex',
                alignItems: 'center',
                textTransform: 'none',
                fontWeight: 'bold',
                borderColor: 'warning.main',
                color: 'warning.main',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'warning.main',
                  color: 'white',
                  borderColor: 'warning.main',
                },
              }}
            >
              {deAllocateLoading ? (
                <CircularProgress size={24} />
              ) : (
                <>
                  <PersonRemoveIcon className="mr-2" />
                  De-Allocate Bed
                </>
              )}
              {/* <PersonRemoveIcon className="mr-2" />
            De-Allocate Bed */}
            </Button>
          )}
          {isRemoveBedEnabled && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleRemoveBed}
              disabled={!isRemoveBedEnabled}
              sx={{
                display: 'flex',
                alignItems: 'center',
                textTransform: 'none',
                fontWeight: 'bold',
                borderColor: 'error.main',
                color: 'error.main',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'error.main',
                  color: 'white',
                  borderColor: 'error.main',
                },
              }}
            >
              {removeBedLoading ? (
                <CircularProgress size={24} />
              ) : (
                <>
                  <DeleteIcon className="mr-2" />
                  Remove Bed
                </>
              )}
              {/* <DeleteIcon className="mr-2" />
          Remove Bed */}
            </Button>
          )}
          {isAssignRoomAndBedEnabled && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleAssignRoomAndBed}
              disabled={!isAssignRoomAndBedEnabled}
              sx={{
                display: 'flex',
                alignItems: 'center',
                textTransform: 'none',
                fontWeight: 'bold',
                borderColor: 'primary.main',
                color: 'primary.main',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  borderColor: 'primary.main',
                },
              }}
            >
              <AddCircleIcon className="mr-2" />
              Assign Room & Bed
            </Button>
          )}
        </Box>

        {/* {isUpdateDialogEnabled && (
        <Dialog open={isDialogOpen} onClose={handleDialogToggle}>
          <DialogTitle>
            {selectedBed.remarks ? 'Update Remarks' : 'Add Remarks'}
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
      )} */}
      </Card>
      <AssignRoomAndBedDialog
        roomAllotment={roomAllotment}
        setRoomAllotment={setRoomAllotment}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        fetchRooms={fetchRooms}
        bed={selectedBed}
        setSelectedBed={setSelectedBed}
        open={assignRoomAndBedDialogOpen}
        onClose={() => setAssignRoomAndBedDialogOpen(false)}
      />
    </>
  );
};
export default DetailsCard;
