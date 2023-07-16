import React, { useEffect, useState } from 'react';
import TextInputField from './TextInputField';
import SelectInputField from './SelectInputField';
import axios from 'axios';
/* {
  learner_id: '',
  learner_mobile: '',
  learner_full_name: '',
  learner_sex: '',
  learner_age: '',
  learner_mother_name: '',
  learner_father_name: '',
  learner_spouse_name: '',
  learner_education: '',
  learner_marital_status: '',
  learner_city_name: '',
  learner_mobile_alternate: '',
  learner_present_address: '',
  learner_hotspot_name: '',
  learner_ward: '',

  training_category: '',
  learner_category: '',
  training_model: '',
  training_course_name: '',
  training_start: '',
  training_end: '',
  training_batch: '',
  training_shift: '',
  training_enrollment: '',
  training_completion: '',

  employment_status_graduate: '',
  occupation_present: '',
  employer_name: '',
  employer_contact: '',
  employer_address: '',
  monthly_income: '',
  incoming_family_member: '',
  family_total_income: '',
} */
const SurveyFormPage = () => {
  const [activeSection, setActiveSection] = useState(null);
  const base_url = process.env.REACT_APP_BACKEND
  const [formData, setFormData] = useState();

  useEffect(() => {
    axios.get(`${base_url}/data/info`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => {
       
        setFormData(res.data);
        setActiveSection('trainee')
      })
      .catch(e => {
        console.log(e);
      })
  }, [])
  const handleSectionClick = (sectionName) => {
    setActiveSection(sectionName === activeSection ? null : sectionName);
  };

  const handleChange = (name, value) => {
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
    axios.post(`${base_url}/data/submit`, formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => {
        // Clear form data and refresh the page
        setFormData(null);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUnreachable = () => {
    axios.post(`${base_url}/data/unreachable`, { cont: 1 })
      .then(() => {
        // Clear form data and refresh the page
        setFormData(null);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
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
        { title: 'Education', name: 'education' },
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
        { title: 'Monthly Income(BDT)', name: 'current_monthly_income_bdt' },
        { title: 'No. of Earning Family Member', name: 'family_earning_member',options:[0,1,2,3,4,5,6,7,8,9,10] },
        { title: 'Monthly Family Income(BDT)', name: 'current_family_monthly_income_bdt' },

      ])}
      <div className="flex justify-center mt-8">
        <button
          className="px-4 py-2 mr-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          onClick={handleUnreachable}
        >
          Unreachable
        </button>
      </div>
    </div>
  );
};

export default SurveyFormPage;
