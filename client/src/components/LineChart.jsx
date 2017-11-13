import React from 'react';
import { LineChart, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';

const X_AXIS_KEY = 'name';
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const Chart = ({ data }) => {
  if (data.length === 0) {
    return <h1 style={{ textAlign: 'center', color: 'red', marginTop: '100px' }}>No results found</h1>;
  }
  return (
    <ResponsiveContainer height={height - 230}>
      <LineChart
        data={data}
      >
        <XAxis dataKey={X_AXIS_KEY} />
        <YAxis />
        <Tooltip />
        {Object.keys(data[0]).filter(key => key !== X_AXIS_KEY).map(key => (
          <Line key={key} type="monotone" dataKey={key} fill="#8884d8" />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
