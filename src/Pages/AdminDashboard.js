import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { LIST_CITY, LIST_SURVEYOR, SURVEY_STATUS } from '../Assets/data';
import dash_bg from '../Assets/images/admin-dash.jpg';

const AdminDashboard = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedSurveyor, setSelectedSurveyor] = useState(null);

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const handleSurveyorChange = (e) => {
    setSelectedSurveyor(e.target.value);
  };

  return (
    <div className='pt-16 md:pt-24 h-full w-full pb-4 md:px-[5%]'>
      <div className='px-4 my-8'>
        <h2>City</h2>
        <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
          {LIST_CITY.map((city) => (
            <div
              key={city.id}
              className={`city-item relative rounded-xl p-2 ${
                selectedCity === city
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

      <div className='px-4 my-8'>
        <h2>Surveyor</h2>
        <select
          className='border p-2 rounded'
          value={selectedSurveyor}
          onChange={handleSurveyorChange}
        >
          <option value=''>Select a surveyor</option>
          {LIST_SURVEYOR.map((surveyor) => (
            <option key={surveyor.id} value={surveyor.name}>
              {surveyor.name} - {surveyor.position}
            </option>
          ))}
        </select>
      </div>

      <div className='px-4 my-8'>
        <h2>Survey Status</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {SURVEY_STATUS.map((status) => {
            const total = Object.values(status.total).reduce((sum, value) => sum + value, 0);
            const completed = Object.values(status.completed).reduce((sum, value) => sum + value, 0);
            const remaining = total - completed;

            const areaData = Object.entries(status.total).map(([area, value]) => ({
              name: area,
              value: value,
            }));

            const colors = [
              '#82ca9d',
              '#8884d8',
              '#FFC658',
              '#ff6b6b',
              '#8c3d3d' // Dark red for remaining
            ];

            return (
              <div key={status.cityId}>
                <h3>{status.name}</h3>
                <PieChart width={300} height={250}>
                  <Pie
                    data={areaData.concat({ name: 'Remaining', value: remaining })}
                    cx='50%'
                    cy='50%'
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                    label={({ name, value, percent }) =>
                      `${name}: ${value} (${(percent * 100).toFixed(2)}%)`
                    }
                  >
                    {areaData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={colors[index % colors.length]} />
                    ))}
                    <Cell key='remaining' fill={colors[colors.length - 1]} />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
