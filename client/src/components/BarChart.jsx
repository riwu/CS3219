import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const Chart = ({ data }) => {
  if (Object.keys(data).length === 0) {
    return <h1 style={{ textAlign: 'center', color: 'red', marginTop: '100px' }}>No results found</h1>;
  }
  return (
    <ResponsiveContainer height={height - 230}>
      <BarChart
        data={Object.entries(data).map(([name, value]) => ({ name, value: Math.round(value) }))}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
