// import React from "react";
// import {
//     Modal,
//     Box,
//     Typography,
//     Grid,
//     Avatar,
//     Divider,
//     Button,
//     IconButton,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import Sheet from '@mui/joy/Sheet';
// import DetailsCard from "./DetailsCard.jsx"
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import { useState, useEffect } from "react";

// export default function BasicModal({ student, open, onClose }) {
//     const totalPages = 4;
//     const [currentPage, setCurrentPage] = useState(1);
//     const [animationDirection, setAnimationDirection] = useState('');
//     const [isVisible, setIsVisible] = useState(open);

//     useEffect(() => {
//         if (open) {
//             setIsVisible(true);
//         } else {
//             // Delay hiding the modal until the animation is finished
//             const timeoutId = setTimeout(() => setIsVisible(false), 300);
//             return () => clearTimeout(timeoutId);
//         }
//     }, [open]);

//     const gotoNextPage = () => {
//         if (currentPage < totalPages) {
//             setAnimationDirection('slide-out'); // Set to slide out
//             setTimeout(() => {
//                 setCurrentPage(currentPage + 1);
//                 setAnimationDirection('slide-in'); // Set to slide in
//             }, 300); // Duration of the animation
//         }
//     };

//     const gotoPreviousPage = () => {
//         if (currentPage > 1) {
//             setAnimationDirection('slide-out'); // Set to slide out
//             setTimeout(() => {
//                 setCurrentPage(currentPage - 1);
//                 setAnimationDirection('slide-in'); // Set to slide in
//             }, 300); // Duration of the animation
//         }
//     };

//     return (
//         <React.Fragment>
//             <Modal
//                 open={open}
//                 onClose={onClose}
//                 aria-labelledby="alumni-modal-title"
//                 sx={{
//                     backdropFilter: "blur(5px)",
//                     WebkitBackdropFilter: "blur(5px)",
//                 }}
//                 className={`fixed inset-0 flex items-center justify-center z-50 ${open ? 'card-enter' : 'card-exit'}`}
//             >
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         // width: 800,
//                         bgcolor: "background.paper",
//                         boxShadow: 24,
//                         borderRadius: 3,
//                         p: 4,
//                     }}
//                     className="bg-white rounded-xl shadow-lg min-w-[750px] min-h-[350px] p-6 h-[67%] w-[75%] transform transition-transform duration-300 scale-100 relative"
//                 >
//                     <IconButton
//                         sx={{ position: "absolute", top: 16, right: 16 }}
//                         onClick={onClose}
//                     >
//                         <CloseIcon />
//                     </IconButton>

//                     {/* --------------------------page-1----------------------------- */}
//                     <div
//                         className={`flex flex-col ${currentPage === 1 ? animationDirection : 'hidden'}`}
//                     >
//                         <div className="flex justify-between">
//                             <div className="text-3xl font-bold">Student Details</div>
//                         </div>
//                         <div className="flex mt-[10px]">
//                             <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4">
//                                 {' '}
//                                 {/* Fixed 20% width for the image */}
//                                 {student.student_photo_url ? (
//                                     <img
//                                         src={
//                                             student.student_photo_url ||
//                                             `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s`
//                                         }
//                                         alt={student.student_full_name}
//                                         className="h-full w-full object-cover rounded-lg"
//                                     />
//                                 ) : (
//                                     <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white text-lg font-bold rounded-lg">
//                                         {student.student_full_name.charAt(0)}
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="flex-grow ml-[10px] flex flex-col">
//                                 <span className="text-2xl font-bold block">
//                                     {student.student_full_name}
//                                 </span>
//                                 <span className="text-gray-600 text-[15px] block mt-1">
//                                     {student.pin_number}
//                                 </span>
//                                 <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
//                                     <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">Mobile Number</div>
//                                             <div>{student.student_contact_number}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">Religion</div>
//                                             <div>{student.religion}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">Caste</div>
//                                             <div>{student.caste}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">Home Town</div>
//                                             <div>{student.city}</div>
//                                         </div>
//                                     </div>
//                                     <Divider />
//                                     <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">Email</div>
//                                             <div>{student.student_email}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">
//                                                 Date Of Birth
//                                             </div>
//                                             <div>
//                                                 {new Date(student.dob).toLocaleDateString('en-GB', {
//                                                     day: '2-digit',
//                                                     month: '2-digit',
//                                                     year: 'numeric',
//                                                 })}
//                                             </div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">Nationality</div>
//                                             <div>{student.nationality}</div>
//                                         </div>
//                                     </div>
//                                     <Divider />
//                                     <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">Address</div>
//                                             <div className="text-[13px]">{student.address}</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* --------------------------page-2----------------------------- */}
//                     <div
//                         className={`flex flex-col ${currentPage == 2 ? animationDirection : 'hidden'}`}
//                     >
//                         <div className="flex justify-between">
//                             <div className="text-3xl font-bold">Student Education</div>
//                         </div>
//                         <div className="flex mt-[10px]">
//                             <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4">
//                                 {' '}
//                                 {/* Fixed 20% width for the image */}
//                                 {student.student_photo_url ? (
//                                     <img
//                                         src={student.student_photo_url}
//                                         alt={student.student_full_name}
//                                         className="h-full w-full object-cover rounded-lg"
//                                     />
//                                 ) : (
//                                     <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white text-lg font-bold rounded-lg">
//                                         {student.student_full_name.charAt(0)}
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="flex-grow ml-[10px] flex flex-col">
//                                 <span className="text-2xl font-bold block">
//                                     {student.student_full_name}
//                                 </span>
//                                 <span className="text-gray-600 text-[15px] block mt-1">
//                                     {student.pin_number}
//                                 </span>
//                                 <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
//                                     <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">
//                                                 University Name
//                                             </div>
//                                             <div className="">{student.name_of_university}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">Collage Name</div>
//                                             <div>{student.name_of_collage}</div>
//                                         </div>
//                                     </div>
//                                     <Divider />
//                                     <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col ">
//                                             <div className="text-[12px] text-gray-600">Course</div>
//                                             <div>{student.course}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">Branch</div>
//                                             <div>{student.branch}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">
//                                                 Student Qualification
//                                             </div>
//                                             <div>{student.student_qualification}</div>
//                                         </div>
//                                     </div>
//                                     <Divider />
//                                     <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">Current Year</div>
//                                             <div>{student.current_year}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">Current Sem</div>
//                                             <div>{student.current_sem}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">
//                                                 {`Total Course Duration`}
//                                             </div>
//                                             <div>{student.course_duration_years}</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* --------------------------page-3----------------------------- */}
//                     <div
//                         className={`flex flex-col ${currentPage == 3 ? animationDirection : 'hidden'}`}
//                     >
//                         <div className="flex justify-between">
//                             <div className="text-3xl font-bold">Parent Details</div>
//                         </div>
//                         <div className="flex mt-[10px]">
//                             <div>
//                                 <div className="h-[90px] md:h-[125px] w-full flex-shrink-0 mr-4 mb-1">
//                                     {' '}
//                                     {/* Fixed 30% width for the image */}
//                                     {student.father_photo_url ? (
//                                         <img
//                                             src={student.father_photo_url}
//                                             alt={student.father_name}
//                                             className="h-full w-full object-cover rounded-lg"
//                                         />
//                                     ) : (
//                                         <div className="flex items-center justify-center h-full w-[150px] bg-blue-500 text-white text-lg font-bold rounded-lg">
//                                             {student.father_name.charAt(0)}
//                                         </div>
//                                     )}
//                                 </div>
//                                 <div className="h-[90px] md:h-[125px] w-full flex-shrink-0 mr-4">
//                                     {' '}
//                                     {/* Fixed 30% width for the image */}
//                                     {student.mother_photo_url ? (
//                                         <img
//                                             src={student.mother_photo_url}
//                                             alt={student.mother_name}
//                                             className="h-full w-full object-cover rounded-lg"
//                                         />
//                                     ) : (
//                                         <div className="flex items-center justify-center h-full w-[150px] bg-blue-500 text-white text-lg font-bold rounded-lg">
//                                             {student.mother_name.charAt(0)}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="flex-grow ml-[10px] flex flex-col">
//                                 <span className="text-2xl font-bold block">
//                                     {student.student_full_name}
//                                 </span>
//                                 <span className="text-gray-600 text-[15px] block mt-1">
//                                     {student.pin_number}
//                                 </span>
//                                 <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
//                                     <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">Father Name</div>
//                                             <div className="">{student.father_name}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">
//                                                 Father Mobile No
//                                             </div>
//                                             <div>{student.father_contact_number}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">Father Email</div>
//                                             <div>{student.father_email}</div>
//                                         </div>
//                                     </div>
//                                     <Divider />
//                                     <div className="my-1 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col ">
//                                             <div className="text-[12px] text-gray-600">Mother name</div>
//                                             <div>{student.mother_name}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">
//                                                 Mother Mobile Number
//                                             </div>
//                                             <div>{student.mother_contact_number}</div>
//                                         </div>
//                                     </div>
//                                     <Divider />
//                                     <div className="my-1 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">
//                                                 Relative Name
//                                             </div>
//                                             <div>{student.relative_name}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">
//                                                 Relative Contact Number
//                                             </div>
//                                             <div>{student.relative_contact_number}</div>
//                                         </div>

//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">Relation</div>
//                                             <div>{student.relation}</div>
//                                         </div>
//                                     </div>
//                                     <div className="my-1 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">
//                                                 Relative Address
//                                             </div>
//                                             <div className="text-[13px]">{student.relative_address}</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* --------------------------page-4----------------------------- */}
//                     <div
//                         className={`flex flex-col ${currentPage == 4 ? animationDirection : 'hidden'}`}
//                     >
//                         <div className="flex justify-between">
//                             <div className="text-3xl font-bold">Reference Details</div>
//                         </div>
//                         <div className="flex mt-[10px]">
//                             <div className="h-[180px] md:h-[250px] w-[20%] flex-shrink-0 mr-4">
//                                 {' '}
//                                 {/* Fixed 30% width for the image */}
//                                 {student.student_photo_url ? (
//                                     <img
//                                         src={student.student_photo_url}
//                                         alt={student.student_full_name}
//                                         className="h-full w-full object-cover rounded-lg"
//                                     />
//                                 ) : (
//                                     <div className="flex items-center justify-center h-full w-full bg-blue-500 text-white text-lg font-bold rounded-lg">
//                                         {student.student_full_name.charAt(0)}
//                                     </div>
//                                 )}
//                             </div>
//                             <div className="flex-grow ml-[10px] flex flex-col">
//                                 <span className="text-2xl font-bold block">
//                                     {student.student_full_name}
//                                 </span>
//                                 <span className="text-gray-600 text-[15px] block mt-1">
//                                     {student.pin_number}
//                                 </span>
//                                 <div className="bg-[#e2e8f0] flex-grow w-full h-full mt-2 rounded-xl">
//                                     <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">
//                                                 Relative Full Name
//                                             </div>
//                                             <div className="">{student.reference_relative_full_name}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">Relation</div>
//                                             <div>{student.reference_relative_relation}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600">
//                                                 Relative Mobile Number
//                                             </div>
//                                             <div>{student.reference_relative_mobile}</div>
//                                         </div>
//                                     </div>
//                                     <Divider />
//                                     <div className="my-2 mx-5 grid grid-flow-col justify-stretch">
//                                         <div className="flex flex-col ">
//                                             <div className="text-[12px] text-gray-600">Sant Name</div>
//                                             <div>{student.name_of_sant}</div>
//                                         </div>
//                                         <div className="flex flex-col">
//                                             <div className="text-[12px] text-gray-600 ">
//                                                 Sant Mobile Number
//                                             </div>
//                                             <div>{student.sant_phone_number}</div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     {/*........................ page logic ends her.............. */}
//                     <div
//                         className="flex flex-row justify-end my-2 mx-2"
//                         style={
//                             {
//                                 position: 'absolute',
//                                 bottom: 10,
//                                 right: 10,
//                             }
//                         }
//                     >
//                         <div>{currentPage} - 4</div>
//                         <div className="cursor-pointer">
//                             <button
//                                 disabled={currentPage == 1 ? true : false}
//                                 className="disabled:text-gray-400"
//                                 onClick={gotoPreviousPage}
//                             >
//                                 <ChevronLeftIcon />
//                             </button>
//                         </div>
//                         <div className="cursor-pointer">
//                             <button
//                                 disabled={currentPage == 4 ? true : false}
//                                 className="disabled:text-gray-400"
//                                 onClick={gotoNextPage}
//                             >
//                                 <ChevronRightIcon />
//                             </button>
//                         </div>
//                     </div>

//                     {/* <Grid container spacing={3}>
//                         <Grid item xs={12} sx={{ textAlign: "center" }}>
//                             <Avatar
//                                 src={student?.student_photo_url || ""}
//                                 alt={student?.student_full_name}
//                                 sx={{
//                                     width: 100,
//                                     height: 100,
//                                     mx: "auto",
//                                     bgcolor: "#1976D2",
//                                     fontSize: "2rem",
//                                 }}
//                             >
//                                 {!student?.student_photo_url && student?.student_full_name.charAt(0)}
//                             </Avatar>
//                             <Typography variant="h5" mt={2} fontWeight="bold">
//                                 {student?.student_full_name}
//                             </Typography>
//                             <Typography variant="subtitle1" color="text.secondary">
//                                 {student?.pin_number}
//                             </Typography>
//                         </Grid>

//                         <Divider sx={{ width: "100%", my: 2 }} />

//                         <Grid item xs={6}>
//                             <Typography variant="subtitle1" fontWeight="bold">
//                                 Course:
//                             </Typography>
//                             <Typography>{student?.course}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Typography variant="subtitle1" fontWeight="bold">
//                                 Current year:
//                             </Typography>
//                             <Typography>{student?.current_year}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Typography variant="subtitle1" fontWeight="bold">
//                                 Email:
//                             </Typography>
//                             <Typography>{student?.student_email}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <Typography variant="subtitle1" fontWeight="bold">
//                                 Contact Number:
//                             </Typography>
//                             <Typography>{student?.student_contact_number}</Typography>
//                         </Grid>
//                         <Grid item xs={12}>
//                             <Typography variant="subtitle1" fontWeight="bold">
//                                 Home Town:
//                             </Typography>
//                             <Typography>{student?.city}</Typography>
//                         </Grid>
//                     </Grid> */}

//                     {/* <DetailsCard
//                         student={student}
//                         onClose={() => {
//                             onClose();
//                             setShowStudent(true); // Reset to show student details on close
//                         }}
//                     /> */}
//                 </Box>
//             </Modal>
//         </React.Fragment>
//     );
// }
