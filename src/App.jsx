import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
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
    createRoutesFromElements(
      <Route path='/' element={<Layout />} >
        <Route path='' element={
          <>
            <StudentDataForm />
            <StudentEducationForm />
            <ParentDetailForm />
            <RelativeForm />
            <SantReferenceForm />
            <RelativeReferenceForm />
          </>
        }
        />
        <Route path='/addStudent' element={<AdmissionForm />} />
        <Route path='/photo' element={<PhotoUpload />} />
        <Route path='/studentDetails' element={<AllStudentDetails />} />
      </Route>
    )
  );


  return (
    <>
      {/* <PhotoUpload/> */}

      {/* <StudentDataForm />
      <StudentEducationForm />
      <ParentDetailForm />
      <RelativeForm />
      <SantReferenceForm />
      <RelativeReferenceForm /> */}

      <RouterProvider router={router} />

    </>
  )
}

export default App
