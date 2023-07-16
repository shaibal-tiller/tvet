import React, { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import TextInputField from '../Components/TextInputField';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const DashboardPage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const userData = jwtDecode(localStorage.getItem('token'))
const base_url = process.env.REACT_APP_BACKEND

  useEffect(() => {
    axios.get(`${base_url}/data/task`,{
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    .then(res=>{
      setData(res.data);
    })
    .catch(e=>{
    console.error(e);
    })
  }, [])

  const handleSurveyClick = () => {
    navigate('/survey');
  };

  return (
    <div className='pt-16 px-8 text-center md:pt-24 h-full w-full pb-4 md:px-[5%] '>
      <div className="p-4  rounded-lg bg-gray-200  px-20 mt-8">
   
       {data && <div className=" text-start mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <TextInputField
            title="City"
            name={'city'}
            readOnly={true}
            value={userData.district?.toUpperCase()}
            backgroundColor="gray-100"
          />
            <TextInputField
            title="Target"
            name={'target'}
            readOnly={true}
            value={data.target}
            backgroundColor="gray-100"
          />
            <TextInputField
            title="First Unreachable"
            name={'firstUnreachable'}
            readOnly={true}
            value={data.firstUnreachable}
            backgroundColor="gray-100"
          />
            <TextInputField
            title="Second Unreachable"
            name={'secondUnreachable'}
            readOnly={true}
            value={data.secondUnreachable}
            backgroundColor="gray-100"
          />
            <TextInputField
            title="Third Unreachable"
            name={'thirdUnreachable'}
            readOnly={true}
            value={data.thirdUnreachable}
            backgroundColor="gray-100"
          />
             <TextInputField
            title="Total Survey"
            name={'totalSurvey'}
            readOnly={true}
            value={data.totalSurvey}
            backgroundColor="gray-100"
          />


        </div>}
        <div className='flex gap-4 justify-center'>
          <button
          onClick={handleSurveyClick}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Start Survey
        </button>
        <button
        
          onClick={()=>{
          navigate('/')
          localStorage.removeItem('token')

        }}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Logout
        </button>
        </div>
        
      </div>
    </div>
  );
};

export default DashboardPage;
