import PhotoUpload from './pages/PhotoUpload.jsx'
import StudentDataForm from './admissionComponents/StudentDataForm.jsx'
import StudentEducationForm from './admissionComponents/StudentEducationForm.jsx'
import ParentDetailForm from './admissionComponents/ParentDetailForm.jsx'
import RelativeForm from './admissionComponents/RelativeForm.jsx'
import SantReferenceForm from './admissionComponents/SantReferenceForm.jsx'
import RelativeReferenceForm from './admissionComponents/RelativeReferenceForm.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from "./layouts/Layout.jsx";
import AdmissionForm from './admissionComponents/AdmissionForm.jsx'
import AllStudentDetails from './adminPortalComponents/AllStudentDetails.jsx'

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/activateAccount",
        element: <ActivateAccountPage />,
      },
      {
        path: "/setNewPassword",
        element: <SetNewPasswordPage />,
      },
      {
      element: <ProtectedRoute />,
      children:[
        {
          path:"/",
          element: <HomePage />,
          children:[
            {
              path:"/form",
              element: <>
                  <StudentDataForm />
                  <StudentEducationForm />
                  <ParentDetailForm />
                  <RelativeForm />
                  <SantReferenceForm />
                  <RelativeReferenceForm />
                </>
            },
            {
              path:"/addStudent",
              element:<AdmissionForm />
            },
            {
              path:"/photo",
              element:<PhotoUpload />
            },
            {
              path:"/studentDetails",
              element:<AllStudentDetails />
            }
        ]
        }
      ]
      }
    ]
  );


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
