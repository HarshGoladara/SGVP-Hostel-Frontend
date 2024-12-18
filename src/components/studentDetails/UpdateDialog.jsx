import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig';

export const UpdateDialog = ({
  students,
  setStudents,
  selectedStudent,
  setSelectedStudent,
  currentPage,
}) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [formData, setFormData] = useState(selectedStudent); // Initialize with student data
  const [loading, setLoading] = useState(false); // Loading state

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update formData
  };

  const filterStudents = (formData) => {
    const filteredStudents = [];
    students.map((student) => {
      if (student.pin_number === selectedStudent.pin_number) {
        filteredStudents.push(formData);
      } else {
        filteredStudents.push(student);
      }
    });
    setStudents(filteredStudents);
  };

  const handleEditSubmit = async () => {
    try {
      // console.log(formData);
      setLoading(true);
      const response = await axios.put(
        `${VITE_BACKEND_BASE_API}/updateData/updateStudent`,
        formData,
      );
      if (response.status === 200) {
        // console.log("Successfully updated alumni data.");
        toast.success('Student data updated successfully');
        setSelectedStudent(formData);
        filterStudents(formData);
      } else {
        toast.error('Error updating student details');
      }
    } catch (error) {
      console.error('Error updating student details:', error);
      toast.error('Error updating student details');
    } finally {
      setLoading(false);
      setOpenEditDialog(false);
    }
  };

  const convertToDateOnly = (isoDateString) => {
    const date = new Date(isoDateString);
    // Adjust to local timezone and format as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <IconButton
        // sx={{ position: "absolute", top: 16, left: 16 }}
        onClick={() => setOpenEditDialog(true)} // Open dialog
      >
        <EditIcon />
      </IconButton>

      {/* Material Dialog for editing */}
      {currentPage === 1 && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Student Details</DialogTitle>
          <DialogContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="student_full_name"
                label="Full Name"
                value={formData.student_full_name}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="religion"
                label="Religion"
                value={formData.religion}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="caste"
                label="Caste"
                value={formData.caste}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="student_contact_number"
                label="Contact Number"
                value={formData.student_contact_number}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="city"
                label="Home Town"
                value={formData.city}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="student_email"
                label="Email"
                value={formData.student_email}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="dob"
                type="date"
                label="Date of Birth"
                // value={formData.dob}
                value={convertToDateOnly(formData.dob)}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="nationality"
                label="Nationality"
                value={formData.nationality}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="postal_pin_number"
                label="Postal Pin Number"
                value={formData.postal_pin_number}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            <div>
              <TextField
                name="address"
                label="Address"
                variant="outlined"
                value={formData.address}
                fullWidth
                multiline
                onChange={handleEditInputChange}
                rows={4}
                aria-colspan={200}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            {/* Add more fields as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit} color="primary">
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'primary' }} />
              ) : (
                'Save'
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Material Dialog for editing */}
      {currentPage === 2 && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Student Education Details</DialogTitle>
          <DialogContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="name_of_university"
                label="Name of University"
                value={formData.name_of_university}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="name_of_collage"
                label="Name Of Collage"
                value={formData.name_of_collage}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="course"
                label="Course"
                value={formData.course}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="branch"
                label="Branch"
                value={formData.branch}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="course_duration_years"
                label="Course Duration In Years"
                value={formData.course_duration_years}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="current_year"
                label="Current Year"
                value={formData.current_year}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="current_sem"
                label="Current Sem"
                value={formData.current_sem}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="student_qualification"
                label="Student Qualification"
                value={formData.student_qualification}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            {/* Add more fields as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit} color="primary">
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'primary' }} />
              ) : (
                'Save'
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Material Dialog for editing */}
      {currentPage === 3 && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Parent & Local Relative Details</DialogTitle>
          <DialogContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="father_name"
                label="Father Name"
                value={formData.father_name}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="father_contact_number"
                label="Father Mobile No"
                value={formData.father_contact_number}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="father_email"
                label="Father Email"
                value={formData.father_email}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="mother_name"
                label="Mother name"
                value={formData.mother_name}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="mother_contact_number"
                label="Mother Mobile Number"
                value={formData.mother_contact_number}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="relative_name"
                label="Relative Name"
                value={formData.relative_name}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="relative_contact_number"
                label="Relative Contact Number"
                value={formData.relative_contact_number}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="relation"
                label="Relation"
                value={formData.relation}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            <div>
              <TextField
                name="relative_address"
                label="Address"
                variant="outlined"
                value={formData.relative_address}
                fullWidth
                multiline
                onChange={handleEditInputChange}
                rows={4}
                aria-colspan={200}
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            {/* Add more fields as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit} color="primary">
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'primary' }} />
              ) : (
                'Save'
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Material Dialog for editing */}
      {currentPage === 4 && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>Edit Reference Details</DialogTitle>
          <DialogContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="reference_relative_full_name"
                label="Relative Full Name"
                value={formData.reference_relative_full_name}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="reference_relative_relation"
                label="Relation"
                value={formData.reference_relative_relation}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="reference_relative_mobile"
                label="Relative Mobile Number"
                value={formData.reference_relative_mobile}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <TextField
                name="name_of_sant"
                label="Sant Name"
                value={formData.name_of_sant}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
              <TextField
                name="sant_phone_number"
                label="Sant Mobile Number"
                value={formData.sant_phone_number}
                onChange={handleEditInputChange}
                fullWidth
                margin="normal"
                className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
              />
            </div>
            {/* Add more fields as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditSubmit} color="primary">
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'primary' }} />
              ) : (
                'Save'
              )}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
