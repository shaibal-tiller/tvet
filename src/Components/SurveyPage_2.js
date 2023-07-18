import React, { useEffect, useState } from 'react';
import TextInputField from './TextInputField';
import SelectInputField from './SelectInputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EDUCATION } from '../Assets/data'
import { GetContext } from '../Context/GetContext';

const SurveyFormPage_2 = () => {
  const [activeSection, setActiveSection] = useState(null);
  const base_url = process.env.REACT_APP_BACKEND
  const [formData, setFormData] = useState();
  const [changedData, setChangedData] = useState({})
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState({}); // State for modal content
  const navigate = useNavigate()
  const myContext = GetContext()

  useEffect(() => {
    setFormData(myContext.userData)
    setActiveSection('trainee')
  }, [])

  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName === activeSection ? null : sectionName);
  };

  const handleChange = (name, value) => {
    setChangedData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const renderAccordionSection = (sectionName, sectionTitle, sectionFields) => {
    const isOpen = sectionName === activeSection;

    return (
      <div className={`border rounded mb-4 ${isOpen ? 'border-gray-400' : 'border-gray-200'}`}>
        <div
          className={`flex items-center border-b-[1px] border-[#46444498] justify-between p-4 cursor-pointer ${isOpen ? 'bg-gray-200' : 'bg-white'
            }`}
          onClick={() => handleSectionClick(sectionName)}
        >
          <h2 className="text-lg font-medium w-[80%] ">{sectionTitle}</h2>
          <div>
            {sectionName === 'trainee' && formData?.unreachable > 0 ? (<h2 className='w-full px-2 text-xs'>Attempts: {formData?.unreachable}</h2>) : <></>}

          </div>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          )}
        </div>
        {isOpen && (
          <div className="p-4 bg-gray-200 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sectionFields.map((field) => {
              return !field.options ?
                <TextInputField
                  type={field.type}
                  key={field.name}
                  title={field.title}
                  name={field.name}
                  readOnly={field.readOnly}
                  value={formData[field.name]}
                  onChange={handleChange}
                  full={field.full}
                />
                :
                <SelectInputField
                  key={field.name}
                  title={field.title}
                  options={field.options}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                />

            })}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = () => {

    axios
      .put(`${base_url}/data/survey/${formData?.training_id}`, changedData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(() => {
        setModalContent({ message: 'Form submitted successfully.', id: formData?.training_id });
        setModalOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleUnreachable = () => {
    axios
      .put(`${base_url}/data/unreachable/${formData?.training_id}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(() => {
        setModalContent({ message: 'Marked as unreachable.', id: formData?.training_id });
        setModalOpen(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  
  const handleModalExit = () => {
    setModalOpen(false);
    navigate('/dashboard')
  };

  const handleModalResurvey = () => {
    setModalOpen(false);
    navigate('/survey')
  };
  return (
    <div  className='pt-16 md:pt-24 h-full w-full pb-4 md:px-[5%]'>
    <div className="p-4 pb-16 no-scrollbar">
      {renderAccordionSection('trainee', 'Trainee Info', [
        { title: 'Training ID', name: 'training_id', readOnly: true },
        { title: 'Full Name', name: 'name', readOnly: true },
        { title: 'Mobile No.', name: 'mobile_no', type: 'number' },
        { title: 'Alternate Mobile No.', name: 'alt_mobile_no', type: 'number' },
        { title: 'Gender', name: 'gender', readOnly: true },
        { title: 'Age', name: 'age', readOnly: true },
        { title: "Father's Name", name: 'father_name', readOnly: true },
        { title: "Mother's Name", name: 'mother_name', readOnly: true },
        { title: 'Marital Status', name: 'marital_status', options: ['Abandoned', 'Married', 'Unmarried', 'Divoreced', 'Separated', 'Widowed'] },
        { title: "Spouse's Name", name: 'spouse_name' },
        { title: 'Education', name: 'education', options: EDUCATION },
        { title: 'City', name: 'city', readOnly: true },
        { title: 'Word No.', name: 'ward_no', readOnly: true },
        { title: 'Hotspot Name', name: 'hotspots', readOnly: true },
        { title: 'Present Address', name: 'p_address', full: true },

      ])}
      {renderAccordionSection('training', 'Training Info', [
        { title: 'Category of Training', name: 'training_catego', readOnly: true },
        { title: 'Category of Learner', name: 'learners_category', readOnly: true },
        { title: 'Models of Training', name: 'training_model', readOnly: true },
        { title: 'Course Name', name: 'course_name', readOnly: true },
        { title: 'Batch No.', name: 'batch_no', readOnly: true },
        { title: 'Shift of Training', name: 'shift', readOnly: true },
        { title: 'Enrollment Status', name: 'enrolled', readOnly: true },
        { title: 'Course Completion', name: 'course_completion', readOnly: true },
        { title: 'Training Starting Date', name: 'course_start', readOnly: true },
        { title: 'Training Ending Date', name: 'course_end', readOnly: true },




      ])}
      {renderAccordionSection('earning', 'Earning Info', [
        { title: 'Employment Status', name: 'current_emp_status', options: ['Unemployed', 'Self-employed', 'Outsourced', 'Wage job'] },
        { title: 'Present Occupation', name: 'current_occupatio', },
        { title: 'Employer/Business Info', name: 'employer_info', full: true },
        { title: 'Monthly Income(BDT)', name: 'current_monthly_income_bdt', type: 'number' },
        { title: 'No. of Earning Family Member', name: 'family_earning_member', options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
        { title: 'Monthly Family Income(BDT)', name: 'current_family_monthly_income_bdt', type: 'number' },

      ])}
      <div className="flex justify-center mt-8">
        <button

          className="px-4 py-2 mr-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="px-4 py-2 text-white bg-red-400 rounded hover:bg-red-600"
          onClick={handleUnreachable}
        >
          Unreachable
        </button>
        <button
          className=" ml-4 px-4 py-2 text-white bg-red-700 rounded hover:bg-red-600"
          onClick={handleModalExit}
        >
          Back
        </button>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 bg-white rounded shadow">
            <h3 className="text-xl font-medium mb-4">{modalContent.message}</h3>
            <p>Name: {formData?.name}</p>
            <p>ID: {modalContent.id}</p>
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 mr-4 text-white bg-blue-500 rounded hover:bg-blue-600"
                onClick={handleModalExit}
              >
                Exit
              </button>
              <button
                className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                onClick={handleModalResurvey}
              >
                New survey
              </button>
            </div>
          </div>
        </div>
      )}
    </div></div>
  );
};

export default SurveyFormPage_2;
