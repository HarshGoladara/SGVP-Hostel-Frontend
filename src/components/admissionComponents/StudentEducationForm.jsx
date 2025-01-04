import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TextField, Button } from '@mui/material';
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';

const StudentEducationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${VITE_BACKEND_BASE_API}/admission/addStudentEducation`,
        data,
      );
      toast.success('Student Education data added successfully!');
      reset(); // Reset the form after success
    } catch (error) {
      toast.error('Error, Try again!');
      console.error('error submitting student education data', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mb-10 max-w-xl mx-auto bg-slate-300 p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Add Student Education
      </h2>

      <TextField
        label="Pin Number"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('pin_number', {
          required: 'Pin number is required',
          pattern: {
            value: /^[0-9]+$/,
            message: 'Pin number must be a valid number',
          },
        })}
        error={!!errors.pin_number}
        helperText={errors.pin_number ? errors.pin_number.message : ''}
        className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
      />

      <TextField
        label="Name of University"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('name_of_university', {
          required: 'University name is required',
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'University name must contain only letters and spaces',
          },
        })}
        error={!!errors.name_of_university}
        helperText={
          errors.name_of_university ? errors.name_of_university.message : ''
        }
        className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
      />

      <TextField
        label="Name of College"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('name_of_collage', {
          required: 'College name is required',
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'College name must contain only letters and spaces',
          },
        })}
        error={!!errors.name_of_collage}
        helperText={
          errors.name_of_collage ? errors.name_of_collage.message : ''
        }
        className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
      />

      <TextField
        label="Course"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('course', {
          required: 'Course is required',
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'Course name must contain only letters and spaces',
          },
        })}
        error={!!errors.course}
        helperText={errors.course ? errors.course.message : ''}
        className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
      />

      <TextField
        label="Branch"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register('branch', {
          required: 'Branch is required',
          pattern: {
            value: /^[A-Za-z\s]+$/,
            message: 'Branch name must contain only letters and spaces',
          },
        })}
        error={!!errors.branch}
        helperText={errors.branch ? errors.branch.message : ''}
        className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
      />

      <TextField
        label="Course Duration (years)"
        variant="outlined"
        fullWidth
        margin="normal"
        type="number"
        {...register('course_duration_years', {
          required: 'Course duration is required',
          valueAsNumber: true,
        })}
        error={!!errors.course_duration_years}
        helperText={
          errors.course_duration_years
            ? errors.course_duration_years.message
            : ''
        }
        className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
      />

      <TextField
        label="Current Year"
        variant="outlined"
        fullWidth
        margin="normal"
        type="number"
        {...register('current_year', {
          required: 'Current year is required',
          valueAsNumber: true,
        })}
        error={!!errors.current_year}
        helperText={errors.current_year ? errors.current_year.message : ''}
        className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
      />

      <TextField
        label="Current Semester"
        variant="outlined"
        fullWidth
        margin="normal"
        type="number"
        {...register('current_sem', {
          required: 'Current semester is required',
          valueAsNumber: true,
        })}
        error={!!errors.current_sem}
        helperText={errors.current_sem ? errors.current_sem.message : ''}
        className="mt-1 block w-full p-2 border border-gray-600 rounded-md bg-white"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        className="mt-4"
      >
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
      {/* <Button
        variant="outlined"
        color="secondary"
        fullWidth
        onClick={() => reset()}
        className="mt-2"
      >
        Cancel
      </Button> */}
    </form>
  );
};

export default StudentEducationForm;
