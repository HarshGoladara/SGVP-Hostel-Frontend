import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/DashboardStyle.css'; // Import your custom styles
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig';

const DashboardBodyTemp = () => {
  const [gatepasses, setGatepasses] = useState([]);

  useEffect(() => {
    // Fetching data from the API
    axios
      .get(`${VITE_BACKEND_BASE_API}/gatepass/getGatepassForAdminApproval`)
      .then((response) => {
        // console.log('API Response:', response.data);
        setGatepasses(response.data.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the gatepasses!', error);
      });
  }, []);

  return (
    <div className="container">
      <h2 className="text-center my-4">Gatepass Approvals</h2>
      <div className="row">
        {gatepasses.map((gatepass) => (
          <div className="col-md-4" key={gatepass.gatepass_number}>
            <div className="card gatepass-card">
              <div className="card-body">
                <h5 className="card-title">
                  Gatepass #{gatepass.gatepass_number}
                </h5>
                <p>
                  <strong>PIN:</strong> {gatepass.pin_number}
                </p>
                <p>
                  <strong>Reason:</strong> {gatepass.reason}
                </p>
                <p>
                  <strong>Parent Approval Status:</strong>
                  <span className={`status ${gatepass.parent_approval_status}`}>
                    {gatepass.parent_approval_status}
                  </span>
                </p>
                <p>
                  <strong>Admin Approval Status:</strong>
                  <span className={`status ${gatepass.admin_approval_status}`}>
                    {gatepass.admin_approval_status}
                  </span>
                </p>
                <p>
                  <strong>Gatepass Created:</strong>{' '}
                  {new Date(gatepass.gatepass_created).toLocaleString()}
                </p>
                <p>
                  <strong>Permission Upto:</strong>{' '}
                  {new Date(
                    gatepass.permission_upto_timestamp,
                  ).toLocaleString()}
                </p>
                {gatepass.in_timestamp && (
                  <p>
                    <strong>In Timestamp:</strong>{' '}
                    {new Date(gatepass.in_timestamp).toLocaleString()}
                  </p>
                )}
                {gatepass.remarks && (
                  <p>
                    <strong>Remarks:</strong> {gatepass.remarks}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardBodyTemp;
