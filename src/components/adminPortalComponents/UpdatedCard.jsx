import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import { VITE_BACKEND_BASE_API } from '../../helper/envConfig/envConfig.js';

const UpdatedCard = ({ student, index }) => {
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

  const handleUpdate = async () => {
    try {
      setUpdatedStudent({
        ...updatedStudent,
        ['pin_number']: student.pin_number,
      });
      const response = await axios.put(
        `${VITE_BACKEND_BASE_API}/updateData/updateStudent`,
        updatedStudent,
      );
      console.log(response.data); // Handle success response
      alert('Data Updated Successfully.');
      setIsEditing(false);
      // Optionally refresh the student data or show success message
    } catch (err) {
      setError('Error updating student data');
      alert('Error Try Again!');
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

export default UpdatedCard;
