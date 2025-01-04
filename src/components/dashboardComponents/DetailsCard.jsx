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
import { useCookies } from 'react-cookie';

const DetailsCard = ({ pendingEntries, onClose }) => {
  // const [cookies] = useCookies(['token']);

  return (
    <Card
      sx={{
        maxWidth: 900,
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
          subheader={`College Student Pending Entries`}
          sx={{ textAlign: 'center' }}
        />
        {/* Close Icon */}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Card Content */}
      <CardContent>
        <div className=" mx-4 mb-4 bg-white shadow-md rounded-lg">
          <div className="mt-4 mx-2">
            {/* Added horizontal margin with mx-2 */}
            <table className="min-w-full border-collapse text-s">
              <thead className="">
                <tr className="bg-gray-400 rounded-2xl">
                  {/* Apply rounded corners to the entire row */}
                  {/* Rounded left side */}
                  <th className="py-2 px-4 text-left font-bold">GID</th>
                  <th className="py-2 px-4 text-left font-bold">Pin</th>
                  <th className="py-2 px-4 text-left font-bold">Name</th>
                  <th className="py-2 px-4 text-left font-bold">Out Going</th>
                  <th className="py-2 px-4 text-left font-bold">
                    Permission Upto
                  </th>
                  <th className="py-2 px-4 text-left font-bold">Entry</th>
                  <th className="py-2 px-4 text-left font-bold">Reason</th>
                  {/* Rounded right side */}
                </tr>
              </thead>
              <tbody>
                {pendingEntries.map((gatepass) => (
                  <tr
                    key={gatepass.gatepass_number}
                    className="border-b hover:bg-gradient-to-r from-blue-200 to-blue-400 odd:bg-gray-200 even:bg-gray-300"
                  >
                    <td className="py-2 px-4">
                      <span className="font-bold">
                        {gatepass.gatepass_number}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <span className="font-bold">{gatepass.pin_number}</span>
                    </td>
                    <td className="py-2 px-4">{gatepass.student_full_name}</td>
                    <td className="py-2 px-4">
                      {new Date(gatepass.outgoing_timestamp).toLocaleString()}
                    </td>
                    <td className="py-2 px-4">
                      {new Date(
                        gatepass.permission_upto_timestamp,
                      ).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 text-center">
                      {gatepass.in_timestamp
                        ? new Date(gatepass.in_timestamp).toLocaleString()
                        : '-'}
                    </td>
                    <td className="py-2 px-4">{gatepass.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailsCard;
