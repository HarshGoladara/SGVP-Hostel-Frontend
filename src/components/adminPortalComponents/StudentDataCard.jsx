import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import toast from 'react-hot-toast';

const StudentDataCard = ({ student, index }) => {
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState(student);

  // State for each section's visibility
  const [isStudentVisible, setIsStudentVisible] = useState(false);
  const [isEducationVisible, setIsEducationVisible] = useState(false);
  const [isParentVisible, setIsParentVisible] = useState(false);
  const [isApprovalPersonVisible, setIsApprovalPersonVisible] = useState(false);
  const [isRelativeVisible, setIsRelativeVisible] = useState(false);
  const [isReferenceRelativeVisible, setIsReferenceRelativeVisible] =
    useState(false);
  const [isSantReferenceVisible, setIsSantReferenceVisible] = useState(false);
  const [isRoomDataVisible, setIsRoomDataVisible] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'Null';
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  };

  const renderField = (
    label,
    value,
    editable = false,
    field,
    type = 'text',
  ) => (
    <div className="grid grid-cols-3 gap-0 border border-black p-2 rounded-lg">
      <span className="font-semibold break-words whitespace-normal">
        {label}
      </span>
      <span className="font-semibold break-words whitespace-normal">:</span>
      {editable ? (
        <input
          type={type}
          value={updatedStudent[field] || ''}
          onChange={(e) =>
            setUpdatedStudent({ ...updatedStudent, [field]: e.target.value })
          }
          className="border rounded p-1 text-gray-700 border-gray-600 break-words whitespace-normal"
        />
      ) : (
        <span className="break-words whitespace-normal">
          {value ? value : 'Null'}
        </span>
      )}
    </div>
  );

  const validateUpdatedStudent = () => {
    const alphabetRegex = /^[A-Za-z\s]+$/; // Regular expression for alphabet and spaces
    const emailRegex = /\S+@\S+\.\S+/; // Regular expression for email validation

    if (
      !updatedStudent.student_full_name.trim() ||
      !alphabetRegex.test(updatedStudent.student_full_name.trim())
    )
      return 'Student Full Name is required and must contain only letters and spaces.';
    if (!updatedStudent.dob || isNaN(Date.parse(updatedStudent.dob)))
      return 'Date of Birth is required and must be a valid date.';
    if (
      !updatedStudent.nationality.trim() ||
      !alphabetRegex.test(updatedStudent.nationality.trim())
    )
      return 'Nationality is required and must contain only letters and spaces.';
    if (
      !updatedStudent.religion.trim() ||
      !alphabetRegex.test(updatedStudent.religion.trim())
    )
      return 'Religion is required and must contain only letters and spaces.';
    if (!updatedStudent.address) return 'Valid Address is required.';
    if (
      !updatedStudent.city.trim() ||
      !alphabetRegex.test(updatedStudent.city.trim())
    )
      return 'Valid City is required.';
    if (
      !updatedStudent.postal_pin_number ||
      !numberRegex.test(updatedStudent.postal_pin_number)
    )
      return 'Postal Pin Number is required and must be a valid number.';
    if (
      !updatedStudent.student_contact_number ||
      updatedStudent.student_contact_number.length !== 10 ||
      !numberRegex.test(updatedStudent.student_contact_number)
    )
      return 'Student Contact Number is required, must be a 10-digit number.';
    if (
      !updatedStudent.student_email ||
      !emailRegex.test(updatedStudent.student_email)
    )
      return 'A valid Student Email is required.';
    if (!updatedStudent.student_qualification)
      return 'Student Qualification is required.';
    // if (!photoFile.studentPhotoFile)
    //     return "Student Photo is required.";

    if (
      !updatedStudent.name_of_university.trim() ||
      !alphabetRegex.test(updatedStudent.name_of_university.trim())
    )
      return 'University name is required.';
    if (
      !updatedStudent.name_of_collage.trim() ||
      !alphabetRegex.test(updatedStudent.name_of_collage.trim())
    )
      return 'College name is required.';
    if (
      !updatedStudent.course.trim() ||
      !alphabetRegex.test(updatedStudent.course.trim())
    )
      return 'Course is required.';
    if (
      !updatedStudent.branch.trim() ||
      !alphabetRegex.test(updatedStudent.branch.trim())
    )
      return 'Branch is required.';
    if (
      !updatedStudent.course_duration_years ||
      isNaN(updatedStudent.course_duration_years)
    )
      return 'Course duration must be a number and not empty.';
    if (!updatedStudent.current_year || isNaN(updatedStudent.current_year))
      return 'Current year must be a number and not empty.';
    if (!updatedStudent.current_sem || isNaN(updatedStudent.current_sem))
      return 'Current semester must be a number and not empty.';

    if (
      !updatedStudent.father_name.trim() ||
      !alphabetRegex.test(updatedStudent.father_name.trim())
    )
      return 'Father name is required.';
    if (
      !updatedStudent.father_contact_number ||
      isNaN(updatedStudent.father_contact_number) ||
      updatedStudent.father_contact_number.length !== 10
    )
      return 'Father contact number is required and should be a valid number of 10 digits.';
    if (
      !updatedStudent.father_email ||
      !emailRegex.test(updatedStudent.father_email)
    )
      return 'A valid father email is required.';
    // if (!photoFile.fatherPhotoFile)
    //     return 'Father photo is required.';
    if (
      !updatedStudent.mother_name.trim() ||
      !alphabetRegex.test(updatedStudent.mother_name.trim())
    )
      return 'Mother name is required.';
    if (
      !updatedStudent.mother_contact_number ||
      isNaN(updatedStudent.mother_contact_number) ||
      updatedStudent.mother_contact_number.length !== 10
    )
      return 'Mother contact number is required and should be a valid number of 10 digits.';
    // if (!photoFile.motherPhotoFile)
    //     return 'Mother photo is required.';
    if (
      !updatedStudent.approval_person_name.trim() ||
      !alphabetRegex.test(updatedStudent.approval_person_name.trim())
    )
      return 'Approval person name is required.';
    if (
      !updatedStudent.approval_person_contact ||
      isNaN(updatedStudent.approval_person_contact) ||
      updatedStudent.approval_person_contact.length !== 10
    )
      return 'Approval person contact number is required and should be a valid number of 10 digits.';
    if (
      !updatedStudent.approval_person_relation.trim() ||
      !alphabetRegex.test(updatedStudent.approval_person_relation.trim())
    )
      return 'Approval person relation is required.';
    if (
      !updatedStudent.approval_person_email ||
      !emailRegex.test(updatedStudent.approval_person_email)
    )
      return 'A valid approval person email is required.';

    if (
      !updatedStudent.relative_name.trim() ||
      !alphabetRegex.test(updatedStudent.relative_name.trim())
    )
      return 'Relative name is required.';
    if (
      !updatedStudent.relation.trim() ||
      !alphabetRegex.test(updatedStudent.relation.trim())
    )
      return 'Relation is required.';
    if (
      !updatedStudent.relative_contact_number ||
      isNaN(updatedStudent.relative_contact_number) ||
      updatedStudent.relative_contact_number.length !== 10
    )
      return 'Relative contact number is required and should be a valid 10-digit number.';
    if (!updatedStudent.relative_address.trim())
      return 'Relative address is required.';

    if (
      !updatedStudent.name_of_sant.trim() ||
      !alphabetRegex.test(updatedStudent.name_of_sant.trim())
    )
      return 'Name of Sant is required.';
    if (
      !updatedStudent.sant_phone_number ||
      isNaN(updatedStudent.sant_phone_number) ||
      updatedStudent.sant_phone_number.length !== 10
    )
      return 'Sant phone number is required and should be a valid 10-digit number.';

    if (
      !updatedStudent.reference_relative_full_name.trim() ||
      !alphabetRegex.test(updatedStudent.reference_relative_full_name.trim())
    )
      return 'Full name is required.';
    if (
      !updatedStudent.reference_relative_relation.trim() ||
      !alphabetRegex.test(updatedStudent.reference_relative_relation.trim())
    )
      return 'Relation is required.';
    if (
      !updatedStudent.reference_relative_mobile ||
      isNaN(updatedStudent.reference_relative_mobile) ||
      updatedStudent.reference_relative_mobile.length !== 10
    )
      return 'Mobile number is required and should be a valid 10-digit number.';

    if (!updatedStudent.room_number || isNaN(updatedStudent.room_number))
      return 'Room must be allocated';
    if (!updatedStudent.bed_number || isNaN(updatedStudent.bed_number))
      return 'Bed must be allocated';

    // Add similar validation rules for other editable fields like parent contact numbers, etc.
    return null; // No validation error
  };

  const handleUpdate = async () => {
    try {
      setUpdatedStudent({
        ...updatedStudent,
        ['pin_number']: student.pin_number,
      });
      const response = await axios.put(
        `http://localhost:5000/api/updateData/updateStudent`,
        updatedStudent,
      );
      console.log(response.data); // Handle success response
      // alert('Data Updated Successfully.');
      toast.success('Data Updated Successfully.');
      setIsEditing(false);
      // Optionally refresh the student data or show success message
    } catch (err) {
      setError('Error updating student data');
      toast.error('Error updating student data');
      // alert('Error Try Again!');
      console.error(err); // Handle error response
    }
  };

  const toggleVisibility = (section, setSection) => {
    setSection(!section);
  };

  return (
    <div
      key={index}
      className="w-full bg-slate-200 rounded-lg shadow-lg p-6 border border-gray-800"
    >
      {/* Flex container for photo and button */}
      <div className="relative mb-4 flex items-center">
        {/* Centering the image */}
        <div className="flex-grow flex justify-center">
          <img
            src={
              student.student_photo_url ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s'
            }
            alt={`${student.student_full_name || 'Unknown'}'s photo`}
            className="w-32 h-32 object-cover rounded-full mx-auto"
          />
        </div>
        {/* Edit/Save button on the right */}
        <div className="absolute right-2 top-2">
          {isEditing ? (
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              <FontAwesomeIcon icon={faSave} size="lg" /> Save
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-black px-4 py-2 rounded"
            >
              <FontAwesomeIcon icon={faEdit} size="lg" /> Edit
            </button>
          )}
        </div>
      </div>
      <h2 className="text-center text-2xl font-semibold">
        {student.student_full_name || 'Null'}
      </h2>
      <p className="text-center text-sm text-gray-700">
        PIN: {student.pin_number || 'Null'}
      </p>

      {/* Student Info Section */}
      <div className="mt-6">
        <div
          className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2 bg-slate-400"
          onClick={() =>
            toggleVisibility(isStudentVisible, setIsStudentVisible)
          }
        >
          <h3 className="text-lg font-semibold">Student Info</h3>
          <span>{isStudentVisible ? '▲' : '▼'}</span>
        </div>
        <div
          className={`transition-all duration-300 ${isStudentVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
        >
          <div className="mt-2 space-y-2">
            {renderField(
              'Date Of Birth',
              formatDate(student.dob),
              isEditing,
              'dob',
              'date',
            )}
            {renderField(
              'Nationality',
              student.nationality,
              isEditing,
              'nationality',
            )}
            {renderField('Religion', student.religion, isEditing, 'religion')}
            {renderField(
              'Address',
              `${student.address || 'Null'}, ${student.city || 'Null'}, ${student.postal_pin_number || 'Null'}`,
              isEditing,
              'address',
            )}
            {renderField(
              'Contact',
              student.student_contact_number,
              isEditing,
              'student_contact_number',
              'number',
            )}
            {renderField(
              'Email',
              student.student_email,
              isEditing,
              'student_email',
            )}
            {renderField(
              'Qualification',
              student.student_qualification,
              isEditing,
              'student_qualification',
            )}
          </div>
        </div>
      </div>

      {/* Education Info Section */}
      <div className="mt-6">
        <div
          className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2 bg-slate-400"
          onClick={() =>
            toggleVisibility(isEducationVisible, setIsEducationVisible)
          }
        >
          <h3 className="text-lg font-semibold">Education Info</h3>
          <span>{isEducationVisible ? '▲' : '▼'}</span>
        </div>
        <div
          className={`transition-all duration-300 ${isEducationVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
        >
          <div className="mt-2 space-y-2">
            {renderField(
              'University',
              student.name_of_university,
              isEditing,
              'name_of_university',
            )}
            {renderField(
              'College',
              student.name_of_collage,
              isEditing,
              'name_of_collage',
            )}
            {renderField(
              'Course',
              `${student.course} (${student.branch})`,
              isEditing,
              'course',
            )}
            {renderField(
              'Duration',
              student.course_duration_years
                ? `${student.course_duration_years} years`
                : 'Null',
              isEditing,
              'course_duration_years',
              'number',
            )}
            {renderField(
              'Current Year',
              student.current_year,
              isEditing,
              'current_year',
              'number',
            )}
            {renderField(
              'Current Semester',
              student.current_sem,
              isEditing,
              'current_sem',
              'number',
            )}
          </div>
        </div>
      </div>

      {/* Parent Details Section */}
      <div className="mt-6">
        <div
          className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2 bg-slate-400"
          onClick={() => toggleVisibility(isParentVisible, setIsParentVisible)}
        >
          <h3 className="text-lg font-semibold">Parent Details</h3>
          <span>{isParentVisible ? '▲' : '▼'}</span>
        </div>
        <div
          className={`transition-all duration-300 ${isParentVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
        >
          <div className="mt-2 space-y-2">
            <img
              src={
                student.father_photo_url ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s'
              }
              alt={`${student.father_name || 'Unknown'}'s photo`}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            {renderField(
              'Father Name',
              student.father_name,
              isEditing,
              'father_name',
            )}
            {renderField(
              'Father Contact',
              student.father_contact_number,
              isEditing,
              'father_contact_number',
              'number',
            )}
            {renderField(
              'Father Email',
              student.father_email,
              isEditing,
              'father_email',
            )}
            <img
              src={
                student.mother_photo_url ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s'
              }
              alt={`${student.mother_name || 'Unknown'}'s photo`}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            {renderField(
              'Mother',
              student.mother_name,
              isEditing,
              'mother_name',
            )}
            {renderField(
              'Mother Contact',
              student.mother_contact_number,
              isEditing,
              'mother_contact_number',
              'number',
            )}
          </div>
        </div>
      </div>

      {/* Approval Person Details Section */}
      <div className="mt-6">
        <div
          className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2 bg-slate-400"
          onClick={() =>
            toggleVisibility(
              isApprovalPersonVisible,
              setIsApprovalPersonVisible,
            )
          }
        >
          <h3 className="text-lg font-semibold">Approval Person</h3>
          <span>{isApprovalPersonVisible ? '▲' : '▼'}</span>
        </div>
        <div
          className={`transition-all duration-300 ${isApprovalPersonVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
        >
          <div className="mt-2 space-y-2">
            {renderField(
              'Name',
              student.approval_person_name,
              isEditing,
              'approval_person_name',
            )}
            {renderField(
              'Contact',
              student.approval_person_contact,
              isEditing,
              'approval_person_contact',
              'number',
            )}
            {renderField(
              'Relation',
              student.approval_person_relation,
              isEditing,
              'approval_person_relation',
            )}
            {renderField(
              'Email',
              student.approval_person_email,
              isEditing,
              'approval_person_email',
            )}
          </div>
        </div>
      </div>

      {/* Relative Details Section */}
      <div className="mt-6">
        <div
          className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2 bg-slate-400"
          onClick={() =>
            toggleVisibility(isRelativeVisible, setIsRelativeVisible)
          }
        >
          <h3 className="text-lg font-semibold">Relative Details</h3>
          <span>{isRelativeVisible ? '▲' : '▼'}</span>
        </div>
        <div
          className={`transition-all duration-300 ${isRelativeVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
        >
          <div className="mt-2 space-y-2">
            {renderField(
              'Name',
              student.relative_name,
              isEditing,
              'relative_name',
            )}
            {renderField('Relation', student.relation, isEditing, 'relation')}
            {renderField(
              'Contact',
              student.relative_contact_number,
              isEditing,
              'relative_contact_number',
              'number',
            )}
            {renderField(
              'Address',
              student.relative_address,
              isEditing,
              'relative_address',
            )}
          </div>
        </div>
      </div>

      {/* Reference Relative Details Section */}
      <div className="mt-6">
        <div
          className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2 bg-slate-400"
          onClick={() =>
            toggleVisibility(
              isReferenceRelativeVisible,
              setIsReferenceRelativeVisible,
            )
          }
        >
          <h3 className="text-lg font-semibold">Reference Relative Details</h3>
          <span>{isReferenceRelativeVisible ? '▲' : '▼'}</span>
        </div>
        <div
          className={`transition-all duration-300 ${isReferenceRelativeVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
        >
          <div className="mt-2 space-y-2">
            {renderField(
              'Name',
              student.reference_relative_full_name,
              isEditing,
              'reference_relative_full_name',
            )}
            {renderField(
              'Relation',
              student.reference_relative_relation,
              isEditing,
              'reference_relative_relation',
            )}
            {renderField(
              'Contact',
              student.reference_relative_mobile,
              isEditing,
              'reference_relative_mobile',
              'number',
            )}
          </div>
        </div>
      </div>

      {/* Sant Reference Details Section */}
      <div className="mt-6">
        <div
          className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2 bg-slate-400"
          onClick={() =>
            toggleVisibility(isSantReferenceVisible, setIsSantReferenceVisible)
          }
        >
          <h3 className="text-lg font-semibold">Sant Reference Details</h3>
          <span>{isSantReferenceVisible ? '▲' : '▼'}</span>
        </div>
        <div
          className={`transition-all duration-300 ${isSantReferenceVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
        >
          <div className="mt-2 space-y-2">
            {renderField(
              'Name',
              student.name_of_sant,
              isEditing,
              'name_of_sant',
            )}
            {renderField(
              'Contact',
              student.sant_phone_number,
              isEditing,
              'sant_phone_number',
              'number',
            )}
          </div>
        </div>
      </div>

      {/* Room Data Section */}
      <div className="mt-6">
        <div
          className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2 bg-slate-400"
          onClick={() =>
            toggleVisibility(isRoomDataVisible, setIsRoomDataVisible)
          }
        >
          <h3 className="text-lg font-semibold">Room Data</h3>
          <span>{isRoomDataVisible ? '▲' : '▼'}</span>
        </div>
        <div
          className={`transition-all duration-300 ${isRoomDataVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}
        >
          <div className="mt-2 space-y-2">
            {renderField(
              'Room No',
              student.room_number,
              isEditing,
              'room_number',
              'number',
            )}
            {renderField(
              'Bed No',
              student.bed_number,
              isEditing,
              'bed_number',
              'number',
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default StudentDataCard;
