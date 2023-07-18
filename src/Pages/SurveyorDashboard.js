import React, { useEffect, useState } from 'react';
import { useNavigate, } from 'react-router-dom';
import TextInputField from '../Components/TextInputField';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import SearchComponent from '../Components/SearchComponent';

const DashboardPage = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const userData = jwt_decode(localStorage.getItem('token'))
  const base_url = process.env.REACT_APP_BACKEND

  useEffect(() => {
    axios.get(`${base_url}/data/task`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
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
              icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-2 top-2 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>}
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
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-2 top-2 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
          </svg>
          }
          />
          <TextInputField
            title="Total Surveyed"
            name={'totalSurvey'}
            readOnly={true}
            value={data.totalSurvey}
            backgroundColor="gray-100"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-2 top-2 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
          </svg>
          }

          />
          <TextInputField
            title="First Unreachable"
            name={'firstUnreachable'}
            readOnly={true}
            value={data.firstUnreachable}
            backgroundColor="gray-100"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-2 top-2 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
          </svg>
          }
          />
          <TextInputField
            title="Second Unreachable"
            name={'secondUnreachable'}
            readOnly={true}
            value={data.secondUnreachable}
            backgroundColor="gray-100"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-2 top-2 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
          </svg>
          }
          />
          <TextInputField
            title="Third Unreachable"
            name={'thirdUnreachable'}
            readOnly={true}
            value={data.thirdUnreachable}
            backgroundColor="gray-100"
            icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="absolute left-2 top-2 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
          </svg>
          }
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

            onClick={() => {
              navigate('/')
              localStorage.removeItem('token')

            }}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Logout
          </button>
        </div>

      </div>
     
              <SearchComponent/>
    

    </div>
  );
};

export default DashboardPage;
