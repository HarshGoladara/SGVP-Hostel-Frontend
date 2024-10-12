import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentDataCard = ({ student, index }) => {
    const [error, setError] = useState('');

    // State for each section's visibility
    const [isStudentVisible, setIsStudentVisible] = useState(false);
    const [isEducationVisible, setIsEducationVisible] = useState(false);
    const [isParentVisible, setIsParentVisible] = useState(false);
    const [isApprovalPersonVisible, setIsApprovalPersonVisible] = useState(false);
    const [isRelativeVisible, setIsRelativeVisible] = useState(false);
    const [isReferenceRelativeVisible, setIsReferenceRelativeVisible] = useState(false);
    const [isSantReferenceVisible, setIsSantReferenceVisible] = useState(false);
    const [isRoomDataVisible, setIsRoomDataVisible] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return 'Null';
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    };

    const renderField = (label, value) => (
        <div className="grid grid-cols-2 gap-4">
            <span className="font-semibold">{label}:</span>
            <span>{value ? value : 'Null'}</span>
        </div>
    );

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    // Toggling function for visibility with animations
    const toggleVisibility = (section, setSection) => {
        setSection(!section);
    };

    return (
        <div key={index} className="w-full bg-slate-200 rounded-lg shadow-md p-6 border border-gray-200">
            <img
                src={student.student_photo_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s'}
                alt={`${student.student_full_name || 'Unknown'}'s photo`}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h2 className="text-center text-2xl font-semibold">{student.student_full_name || 'Null'}</h2>
            <p className="text-center text-sm text-gray-500">PIN: {student.pin_number || 'Null'}</p>

            {/* Student Info Section */}
            <div className="mt-6">
                <div className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2" onClick={() => toggleVisibility(isStudentVisible, setIsStudentVisible)}>
                    <h3 className="text-lg font-semibold">Student Info</h3>
                    <span>{isStudentVisible ? '▲' : '▼'}</span>
                </div>
                <div className={`transition-all duration-300 ${isStudentVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                    <div className="mt-2 space-y-2">
                        {renderField('Date Of Birth', formatDate(student.dob))}
                        {renderField('Nationality', student.nationality)}
                        {renderField('Religion', student.religion)}
                        {renderField('Address', `${student.address || 'Null'}, ${student.city || 'Null'}, ${student.postal_pin_number || 'Null'}`)}
                        {renderField('Contact', student.student_contact_number)}
                        {renderField('Email', student.student_email)}
                        {renderField('Qualification', student.student_qualification)}
                    </div>
                </div>
            </div>

            {/* Education Info Section */}
            <div className="mt-6">
                <div className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2" onClick={() => toggleVisibility(isEducationVisible, setIsEducationVisible)}>
                    <h3 className="text-lg font-semibold">Education Info</h3>
                    <span>{isEducationVisible ? '▲' : '▼'}</span>
                </div>
                <div className={`transition-all duration-300 ${isEducationVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                    <div className="mt-2 space-y-2">
                        {renderField('University', student.name_of_university)}
                        {renderField('College', student.name_of_collage)}
                        {renderField('Course', `${student.course} (${student.branch})`)}
                        {renderField('Duration', student.course_duration_years ? `${student.course_duration_years} years` : 'Null')}
                        {renderField('Current Year', student.current_year)}
                        {renderField('Current Semester', student.current_sem)}
                    </div>
                </div>
            </div>

            {/* Parent Details Section */}
            <div className="mt-6">
                <div className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2" onClick={() => toggleVisibility(isParentVisible, setIsParentVisible)}>
                    <h3 className="text-lg font-semibold">Parent Details</h3>
                    <span>{isParentVisible ? '▲' : '▼'}</span>
                </div>
                <div className={`transition-all duration-300 ${isParentVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                    <div className="mt-2 space-y-2">
                        <img
                            src={student.father_photo_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s'}
                            alt={`${student.father_name || 'Unknown'}'s photo`}
                            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                        />
                        {renderField('Father Name', student.father_name)}
                        {renderField('Father Contact', student.father_contact_number)}
                        {renderField('Father Email', student.father_email)}
                        <img
                            src={student.mother_photo_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrNIrc_GMNFCWvfIVx-5-1jI0YMf-3a6yyg&s'}
                            alt={`${student.mother_name || 'Unknown'}'s photo`}
                            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                        />
                        {renderField('Mother', student.mother_name)}
                        {renderField('Mother Contact', student.mother_contact_number)}
                    </div>
                </div>
            </div>

            {/* Approval Person Details Section */}
            <div className="mt-6">
                <div className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2" onClick={() => toggleVisibility(isApprovalPersonVisible, setIsApprovalPersonVisible)}>
                    <h3 className="text-lg font-semibold">Approval Person Details</h3>
                    <span>{isApprovalPersonVisible ? '▲' : '▼'}</span>
                </div>
                <div className={`transition-all duration-300 ${isApprovalPersonVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                    <div className="mt-2 space-y-2">
                        {renderField('Name', student.approval_person_name)}
                        {renderField('Contact Number', student.approval_person_contact)}
                        {renderField('Relation', student.approval_person_relation)}
                        {renderField('Email', student.approval_person_email)}
                    </div>
                </div>
            </div>

            {/* <h3 className="text-lg font-semibold mt-6">Approval Person Details</h3>
                    <div className="mt-2 space-y-2">
                        {renderField('Name', student.approval_person_name)}
                        {renderField('Contact Number', student.approval_person_contact)}
                        {renderField('Relation', student.approval_person_relation)}
                        {renderField('Email', student.approval_person_email)}
                    </div> */}

            {/* Relative Details Section */}
            <div className="mt-6">
                <div className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2" onClick={() => toggleVisibility(isRelativeVisible, setIsRelativeVisible)}>
                    <h3 className="text-lg font-semibold">Relative Details</h3>
                    <span>{isRelativeVisible ? '▲' : '▼'}</span>
                </div>
                <div className={`transition-all duration-300 ${isRelativeVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                    <div className="mt-2 space-y-2">
                        {renderField('Name', student.relative_name)}
                        {renderField('Relation', student.relation)}
                        {renderField('Contact Number', student.relative_contact_number)}
                        {renderField('Address', student.relative_address)}
                    </div>
                </div>
            </div>

            {/* <h3 className="text-lg font-semibold mt-6">Relative Details</h3>
                    <div className="mt-2 space-y-2">
                        {renderField('Name', student.relative_name)}
                        {renderField('Relation', student.relation)}
                        {renderField('Contact Number', student.relative_contact_number)}
                        {renderField('Address', student.relative_address)}
                    </div> */}

            {/* Relative Reference Details Section */}
            <div className="mt-6">
                <div className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2" onClick={() => toggleVisibility(isReferenceRelativeVisible, setIsReferenceRelativeVisible)}>
                    <h3 className="text-lg font-semibold">Relative Reference Details</h3>
                    <span>{isReferenceRelativeVisible ? '▲' : '▼'}</span>
                </div>
                <div className={`transition-all duration-300 ${isReferenceRelativeVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                    <div className="mt-2 space-y-2">
                        {renderField('Name', student.reference_relative_full_name)}
                        {renderField('Relation', student.reference_relative_relation)}
                        {renderField('Contact Number', student.reference_relative_mobile)}
                    </div>
                </div>
            </div>

            {/* <h3 className="text-lg font-semibold mt-6">Relative Reference Details</h3>
                    <div className="mt-2 space-y-2">
                        {renderField('Name', student.reference_relative_full_name)}
                        {renderField('Relation', student.reference_relative_relation)}
                        {renderField('Contact Number', student.reference_relative_mobile)}
                    </div> */}

            {/* Sant Reference Details Section */}
            <div className="mt-6">
                <div className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2" onClick={() => toggleVisibility(isSantReferenceVisible, setIsSantReferenceVisible)}>
                    <h3 className="text-lg font-semibold">Sant Reference Details</h3>
                    <span>{isSantReferenceVisible ? '▲' : '▼'}</span>
                </div>
                <div className={`transition-all duration-300 ${isSantReferenceVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                    <div className="mt-2 space-y-2">
                        {renderField('Name', student.name_of_sant)}
                        {renderField('Contact Number', student.sant_phone_number)}
                    </div>
                </div>
            </div>

            {/* <h3 className="text-lg font-semibold mt-6">Sant Reference Details</h3>
                    <div className="mt-2 space-y-2">
                        {renderField('Name', student.name_of_sant)}
                        {renderField('Contact Number', student.sant_phone_number)}
                    </div> */}

            {/* Room Allotment Section */}
            <div className="mt-6">
                <div className="cursor-pointer flex items-center justify-between rounded-2xl border border-black p-2" onClick={() => toggleVisibility(isRoomDataVisible, setIsRoomDataVisible)}>
                    <h3 className="text-lg font-semibold">Room Allotted</h3>
                    <span>{isRoomDataVisible ? '▲' : '▼'}</span>
                </div>
                <div className={`transition-all duration-300 ${isRoomDataVisible ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                    <div className="mt-2 space-y-2">
                        {renderField('Room Number', student.room_number)}
                        {renderField('Bed Number', student.bed_number)}
                    </div>
                </div>
            </div>

            {/* <h3 className="text-lg font-semibold mt-6">Room Allotted</h3>
                    <div className="mt-2 space-y-2">
                        {renderField('Room Number', student.room_number)}
                        {renderField('Bed Number', student.bed_number)}
                    </div> */}
        </div>
    );
};

export default StudentDataCard;
