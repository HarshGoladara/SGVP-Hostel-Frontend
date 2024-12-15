import PhotoUpload from './pages/PhotoUpload.jsx';
import StudentDataForm from './components/admissionComponents/StudentDataForm.jsx';
import StudentEducationForm from './components/admissionComponents/StudentEducationForm.jsx';
import ParentDetailForm from './components/admissionComponents/ParentDetailForm.jsx';
import RelativeForm from './components/admissionComponents/RelativeForm.jsx';
import SantReferenceForm from './components/admissionComponents/SantReferenceForm.jsx';
import RelativeReferenceForm from './components/admissionComponents/RelativeReferenceForm.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AdmissionForm from './components/admissionComponents/AdmissionForm.jsx';
import AllStudentDetails from './components/adminPortalComponents/AllStudentDetails.jsx';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/authentication/Login.jsx';
import ForgotPasswordPage from './pages/authentication/ForgotPassword.jsx';
import RegisterPage from './pages/authentication/Register.jsx';
import ActivateAccountPage from './pages/authentication/ActivateAccount.jsx';
import SetNewPasswordPage from './pages/authentication/SetNewPassword.jsx';
import ProtectedRoute from './pages/authentication/ProtectedRoutes.jsx';
import { Toaster } from 'react-hot-toast';

import './css/App.css';
import Sidebar from './layouts/Sidebar.jsx';
// import StudentInfo from './components/studentDetails/StudentInfo.jsx'
import StudentNavbar from './components/studentDetails/StudentNavbar.jsx';
import StudentLayout from './components/studentDetails/StudentLayout.jsx';
import TempAdmissionForm from './components/admissionComponents/TempAdmissionForm.jsx';

import LoginComponent from './components/authComponents/LoginComponent.jsx';
import OtpVerificationComponent from './components/authComponents/OtpVerificationComponent.jsx';
import WelcomeComponent from './components/authComponents/WelcomeComponent.jsx';
import HomeComponent from './components/introComponents/HomeComponent.jsx';
import { Photo } from '@mui/icons-material';
import TempStudentLayout from './components/tempStudentComponents/TempStudentLayout.jsx';
import AlumniStudentLayout from './components/alumniStudentComponents/AlumniStudentLayout.jsx';
import GatepassBodyTemp from './components/gatepassComponents/GatepassBodyTemp.jsx';
import GatepassLayout from './components/gatepassComponents/GatepassLayout.jsx';
import ArchivedGatepassLayout from './components/archivedGatepassComponents/ArchivedGatepassLayout.jsx';
import CustomCircularLoader from './components/commonCustomComponents/CustomCircularLoader.jsx';
import HairballSpinner from './components/commonCustomComponents/HairballSpinner.jsx';
import { Blocks } from 'react-loader-spinner';
import BlocksLoader from './components/commonCustomComponents/BlocksLoader.jsx';

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
              speed={1.5}
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
    // ---------temporarily public access start----------------------

    {
      path: '/dashboard',
      element: (
        <div className="app-container">
          <Sidebar />
          <div className="flex-grow">
            <HomeComponent />
          </div>
        </div>
      ),
    },
    {
      path: '/studentDetails',
      element: (
        <div className="app-container">
          <Sidebar />
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
          <Sidebar />
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
          <Sidebar />
          <div className="flex-grow">
            <HomeComponent />
          </div>
        </div>
      ),
    },
    {
      path: '/gatepass',
      element: (
        <div className="app-container">
          <Sidebar />
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
          <Sidebar />
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
          <Sidebar />
          <div className="flex-grow">
            <HomeComponent />
          </div>
        </div>
      ),
    },
    {
      path: '/alumni',
      element: (
        <div className="app-container">
          <Sidebar />
          <div className="flex-grow">
            <AlumniStudentLayout />
          </div>
        </div>
      ),
    },

    // ---------temporarily public access end----------------------
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <HomePage />,
          children: [
            {
              path: '/studentDetails',
              element: (
                <div className="app-container">
                  <Sidebar />
                  <div className="flex-grow">
                    <StudentLayout />
                  </div>
                </div>
              ),
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      {/* <div className="app-container">
        <Sidebar />
        <div className="flex-grow">
          <StudentLayout />
        </div>
      </div> */}

      {/* ----------------------------------------------------- */}
      {/* <RouterProvider router={router} /> */}
      {/* ----------------------------------------------------- */}

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
