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

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
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
      path: '/forgotpassword',
      element: <ForgotPasswordPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/activateAccount',
      element: <ActivateAccountPage />,
    },
    {
      path: '/setNewPassword',
      element: <SetNewPasswordPage />,
    },
    {
      path: '/form',
      element: (
        <>
          <StudentDataForm />
          <StudentEducationForm />
          <ParentDetailForm />
          <RelativeForm />
          <SantReferenceForm />
          <RelativeReferenceForm />
        </>
      ),
    },
    {
      path: '/addStudent',
      element: <AdmissionForm />,
    },
    {
      path: '/tempAddStudent',
      element: <TempAdmissionForm />,
    },
    {
      path: '/photo',
      element: <PhotoUpload />,
    },
    // ---------temporarily public access start----------------------
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
