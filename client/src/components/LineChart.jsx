import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';

const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const Chart = props => (
  <ResponsiveContainer height={height - 230}>
    <LineChart
      data={Object.entries(props.data).map(([name, value]) => ({
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

export default Chart;
