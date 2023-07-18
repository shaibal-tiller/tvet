import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { LIST_CITY, SURVEY_STATUS } from '../Assets/data';
import SelectInputField from '../Components/SelectInputField';
import axios from 'axios';
import PieChartComponent from '../Components/PieChartComponent';
import Download from '../Components/Download';

const AdminDashboard = () => {
  const [selectedCity, setSelectedCity] = useState();
  const [selectedSurveyor, setSelectedSurveyor] = useState(null);
  const [surveyorList, setSurveyorList] = useState([])

  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [hotspotList, setHotspotList] = useState([])



  const base_url = process.env.REACT_APP_BACKEND
  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const handleSurveyorChange = (name, value) => {
    setSelectedSurveyor(value);
  };
  const handleHotspotChange = (name, value) => {
    setSelectedHotspot(value);
  };

  useEffect(() => {

    axios.get(`${base_url}/admin/getusers`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => {
      setSurveyorList(res.data.surveyorList.map(el => `${el.name}-${el.id}`));
    })

  }, [])



  const handleAssign = (e) => {
    axios.put(`${base_url}/admin/assign/${selectedCity.name}/${selectedHotspot?.split('-(')[0]}/${selectedSurveyor?.split('-')[1]}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then(res => {
        if (res.status == 200) {
          alert(` ${selectedSurveyor} Assigned to ${selectedHotspot?.split('-(')[0]}`)
        }
      })
      .catch(e => console.error(e))
  }



  useEffect(() => {

    axios.get(`${base_url}/admin/hotspots/${selectedCity?.name}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => {
      setHotspotList(res.data.hotspots);
    })

  }, [selectedCity])



  return (
    <div className='pt-16 md:pt-24 h-full w-full pb-4 md:px-[5%]'>
      <div className='pb-4 bg-[#a5a3a362] rounded-xl mt-2'>
        <h2 className='pt-2 px-4 text-xl text-center '>Assign Surveyor</h2>
        <div className='px-4 my-8'>
          <h2>Select City</h2>
          <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
            {LIST_CITY.map((city) => (
              <div
                key={city.id}
                className={`city-item relative rounded-xl p-2 ${selectedCity === city
                  ? 'bg-[#8fb3b3af] scale-105 cursor-pointer border-2 border-green-400'
                  : 'hover:bg-[#8fb3b3af] hover:scale-105 hover:cursor-pointer'
                  }`}
                onClick={() => handleCityClick(city)}
              >
                <img src={city.img} className='h-full w-full rounded-xl' alt={city.name} />
                <p className='left-4 text-[20px] absolute z-10 bottom-4 bg-slate-500 px-2 rounded-md text-white uppercase'>
                  {city.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className='px-4 my-8 flex justify-center items-center  flex-col  mx-auto'>

          <div className='w-[26rem]  text-center'>
            <SelectInputField
              extra='ml-10'
              name={'surveyor'}
              title={"Select Surveyor"}
              options={surveyorList}
              value={selectedSurveyor}
              onChange={handleSurveyorChange}
            />
          </div>
          <div className='w-[26rem] text-center'>
            {hotspotList.length ? <SelectInputField
            extra='ml-10'
              name={'hotspot'}
              title={"Select Hotspot"}
              options={hotspotList}
              value={selectedHotspot}
              onChange={handleHotspotChange}
            /> : <></>}
          </div>

          <button
            className="disabled:cursor-not-allowed md:items-center  w-[21rem]   py-2 text-white disabled:bg-[#646464] bg-green-500 rounded hover:bg-green-600"
            disabled={!(selectedHotspot && selectedSurveyor && selectedCity)} onClick={handleAssign}
          >
            Assign
          </button>

        </div>
      </div>

      <div className='px-4 my-8'>
        <h2>City Status</h2>
        <PieChartComponent />
        <div className='hidden'>
          <Download />
        </div>
        
      </div>
      
    </div>
  );
};

export default AdminDashboard;
