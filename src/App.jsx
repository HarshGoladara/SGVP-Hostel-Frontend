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

import './assets/css/App.css';
import Sidebar from './layouts/Sidebar.jsx';
// import StudentInfo from './components/studentDetails/StudentInfo.jsx'
import StudentNavbar from './components/studentDetails/StudentNavbar.jsx';
import StudentLayout from './components/studentDetails/StudentLayout.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
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
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <HomePage />,
          children: [
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
              path: '/studentLayout',
              element: <StudentLayout />,
            },
            {
              path: '/addStudent',
              element: <AdmissionForm />,
            },
            {
              path: '/photo',
              element: <PhotoUpload />,
            },
            {
              path: '/studentDetails',
              element: <AllStudentDetails />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
