import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const Chart = props => (
  <ResponsiveContainer height={height - 230}>
    <BarChart
      data={Object.entries(props.data).map(([name, value]) => ({
      name,
      value,
    }))}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

export default Chart;
