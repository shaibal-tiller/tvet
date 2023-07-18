import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PieChartComponent = ({ data }) => {
  const base_url = process.env.REACT_APP_BACKEND


  const [chartData, setChartData] = useState([])
  useEffect(() => {
    axios.get(`${base_url}/admin/citystatus/pie`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => {
      setChartData(res.data);

    })
      .catch(e => {
        console.error(e);
      })
  }, [])





  return (
    <div className='grid grid-cols-2  md:grid-cols-2  xl:grid-cols-3'>
      {chartData.map(({ city, first_unreachable
        , incomplete, second_unreachable, third_unreachable, total_survey }) => {

        const pieData = [
          { name: 'Total Survey', value: parseInt(total_survey), color: '38b000' },
          { name: 'Incomplete', value: parseInt(incomplete), color: '#f21b3f' },
          { name: '1st Unreachable', value: parseInt(first_unreachable), color: '#f48c06' },
          { name: '2nd Unreachable', value: parseInt(second_unreachable), color: '#e85d04' },
          { name: '3rd Unreachable', value: parseInt(third_unreachable), color: '#dc2f02' },
          /*  { name: 'Incomplete', value: parseInt(incomplete) },
           { name: 'Incomplete', value: parseInt(incomplete) }, */
        ];
        const total = pieData.reduce((sum, item) => sum + item.value, 0);

        return (
          <div className="  " key={city}>
            <h2 className='text-center'>{city}</h2>
            <ResponsiveContainer  height={200} className={''} width={'98%'}>
            <PieChart  margin={{top:80}} className='mx-auto border bg-[#a5a3a362] rounded-lg hover:shadow-lg hover:scale-105'>
              <Pie
                dataKey="value"
                data={pieData}
                cx={'50%'}
                cy={'20%'}
                outerRadius={70}
                label
                
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip  formatter={(value) => `${((value/total)*100).toFixed(2)}%`}/>

            </PieChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};

export default PieChartComponent;
