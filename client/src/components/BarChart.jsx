import React from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const Chart = props => (
  <BarChart
    width={width}
    height={250}
    data={Object.entries(props.data).map(([name, value]) => ({ name, value }))}
  >
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Bar dataKey="value" fill="#8884d8" />
  </BarChart>
);

export default Chart;
