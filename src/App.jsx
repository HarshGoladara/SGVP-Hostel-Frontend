import PhotoUpload from './pages/PhotoUpload.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './pages/authentication/ProtectedRoutes.jsx';
import { Toaster } from 'react-hot-toast';

import './css/App.css';
import StudentLayout from './components/studentDetails/StudentLayout.jsx';
import TempAdmissionForm from './components/admissionComponents/TempAdmissionForm.jsx';

import LoginComponent from './components/authComponents/LoginComponent.jsx';
import OtpVerificationComponent from './components/authComponents/OtpVerificationComponent.jsx';
import WelcomeComponent from './components/authComponents/WelcomeComponent.jsx';
import HomeComponent from './components/introComponents/HomeComponent.jsx';
import { Dashboard, Photo } from '@mui/icons-material';
import TempStudentLayout from './components/tempStudentComponents/TempStudentLayout.jsx';
import AlumniStudentLayout from './components/alumniStudentComponents/AlumniStudentLayout.jsx';
import GatepassLayout from './components/gatepassComponents/GatepassLayout.jsx';
import ArchivedGatepassLayout from './components/archivedGatepassComponents/ArchivedGatepassLayout.jsx';
import CustomCircularLoader from './components/commonCustomComponents/CustomCircularLoader.jsx';
import HairballSpinner from './components/commonCustomComponents/HairballSpinner.jsx';
import BlocksLoader from './components/commonCustomComponents/BlocksLoader.jsx';
import DrawerBasic from './components/commonCustomComponents/DrawerBasic.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeComponent />,
    },
    {
      path: '/login',
      element: <LoginComponent />,
    },
    {
      path: '/otpVerification',
      element: <OtpVerificationComponent />,
    },
    {
      path: '/welcome',
      element: <WelcomeComponent />,
    },
    {
      path: '/tempAddStudent',
      element: <TempAdmissionForm />,
    },
    {
      path: '/photo',
      element: <PhotoUpload />,
    },
    {
      path: '/drawer',
      element: <DrawerBasic />,
    },
    {
      path: '/circle',
      element: (
        <div>
          <CustomCircularLoader size={150} logoSrc="/images/logo.jpg" />
          <div>
            <HairballSpinner
              colors={{
                fillColor1: '#c0392b',
                fillColor2: '#d35400',
                fillColor3: '#f39c12',
                fillColor4: '#16a085',
              }}
              backgroundColor="#fff"
              speed={2}
              width={200}
              height={200}
              logoSrc="/images/logo.jpg"
              logoSize={115}
            />
          </div>
          <BlocksLoader visible={true} logoSrc="/images/logo.jpg" />
        </div>
      ),
    },

    // ---------------------------protected route with cookie start-------------------------------
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/dashboard',
          element: (
            <div className="app-container">
              {/* <Sidebar /> */}
              <div className="flex-grow">
                <DrawerBasic />
                <PhotoUpload />
              </div>
            </div>
          ),
        },
        {
          path: '/studentDetails',
          element: (
            <div className="app-container">
              {/* <Sidebar /> */}
              <div className="flex-grow">
                <StudentLayout />
              </div>
            </div>
          ),
        },
        {
          path: '/tempStudentDetails',
          element: (
            <div className="app-container">
              {/* <Sidebar /> */}
              <div className="flex-grow">
                <TempStudentLayout />
              </div>
            </div>
          ),
        },
        {
          path: '/attendence',
          element: (
            <div className="app-container">
              {/* <Sidebar /> */}
              <div className="flex-grow">
                <DrawerBasic />
                <PhotoUpload />
              </div>
            </div>
          ),
        },
        {
          path: '/gatepass',
          element: (
            <div className="app-container">
              {/* <Sidebar /> */}
              <div className="flex-grow">
                <GatepassLayout />
                {/* <GatepassBodyTemp /> */}
              </div>
            </div>
          ),
        },
        {
          path: '/archivedGatepass',
          element: (
            <div className="app-container">
              {/* <Sidebar /> */}
              <div className="flex-grow">
                <ArchivedGatepassLayout />
              </div>
            </div>
          ),
        },
        {
          path: '/roomAllotment',
          element: (
            <div className="app-container">
              {/* <Sidebar /> */}
              <div className="flex-grow">
                <DrawerBasic />
                <PhotoUpload />
              </div>
            </div>
          ),
        },
        {
          path: '/alumni',
          element: (
            <div className="app-container">
              {/* <Sidebar /> */}
              <div className="flex-grow">
                <AlumniStudentLayout />
              </div>
            </div>
          ),
        },
      ],
    },
    // ---------------------------protected route with cookie ends-------------------------------
  ]);

  return (
    <>
      <div>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        ></Toaster>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
