import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';

const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const Chart = ({ data }) => {
  if (Object.keys(data).length === 0) {
    return <h1 style={{ textAlign: 'center', color: 'red', marginTop: '100px' }}>No results found</h1>;
  }
  return (
    <ResponsiveContainer height={height - 230}>
      <LineChart
        data={Object.entries(data).map(([name, value]) => ({
        name,
        value,
      }))}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" fill="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
