import React, { useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import { GetContext } from '../Context/GetContext';
import SelectInputField from '../Components/SelectInputField';

const DashboardPage = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const navigate = useNavigate();
  const myContext = GetContext()
  const userData = myContext.userData
  const handleAreaChange = (e) => {
    
     setSelectedArea(e.target.value);
  };

  const handleSurveyClick = () => {
    // Assuming the user ID is stored in userData.id

    const areaId = 1//selectedArea; // You may need to adjust this based on your data structure

    // Perform any necessary data handling or API calls here

    // Navigate to the survey page
    navigate('/survey');
  };

  return (
    <div className='pt-16 md:pt-24 h-full w-full pb-4 md:px-[5%]'>
    <div className="p-4">
        <h2 className="text-center mb-4">City: {userData.city}</h2>
        <div className="mb-4">
          <SelectInputField
          
            title="Select Area"
            value={selectedArea}
            onChange={handleAreaChange}
            options={['Area 1', 'Area 2', 'Area 3', 'Area 4']}
            backgroundColor="gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">ID</label>
          <input
            type="text"
            value={userData.id}
            readOnly
            className="border border-gray-300 p-2 rounded bg-gray-100"
          />
        </div>
        <button
          onClick={handleSurveyClick}
          disabled={!selectedArea}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Survey
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
