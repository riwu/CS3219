import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line } from 'recharts';

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const Chart = props => (
  <LineChart
    width={width}
    height={250}
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
);

export default Chart;
