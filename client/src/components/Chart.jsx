import React from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['blue', 'red', 'black', 'purple', 'grey', 'navy',
  'fuchsia', 'maroon', 'teal', 'orange'];
const X_AXIS_KEY = 'name';
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const Chart = ({ data, ChartType, ChartFill }) => {
  if (data.length === 0) {
    return <h1 style={{ textAlign: 'center', color: 'red', marginTop: '100px' }}>No results found</h1>;
  }
  return (
    <ResponsiveContainer height={height - 310}>
      <ChartType data={data}>
        <XAxis dataKey={X_AXIS_KEY} />
        <YAxis />
        <Tooltip />
        {Object.keys(data[0]).filter(key => key !== X_AXIS_KEY).map((key, index) => (
          <ChartFill key={key} type="monotone" dataKey={key} fill={COLORS[index]} stroke={COLORS[index]} />
        ))}
      </ChartType>
    </ResponsiveContainer>
  );
};

export default Chart;
