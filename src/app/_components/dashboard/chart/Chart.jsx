'use client'
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Chart = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or return a loading indicator
  }

  const data = [
    {
      name: 'Page A',
      visit: 4000,
      clicked: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      visit: 3000,
      clicked: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      visit: 2000,
      clicked: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      visit: 2780,
      clicked: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      visit: 1890,
      clicked: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      visit: 2390,
      clicked: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      visit: 3490,
      clicked: 4300,
      amt: 2100,
    },
  ];


  return (
    <div className="h-[450px] p-[20px] rounded-[10px] bg-slate-900 flex flex-col gap-5">
      <h1>Charts</h1>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{background: "#151c2c", border: "none"}}/>
          <Legend />
          <Line type="monotone" dataKey="visit" stroke="#8884d8" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="clicked" stroke="#82ca9d" strokeDasharray="3 4 5 2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart