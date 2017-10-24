import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['blue', 'green', 'red', 'black', 'purple', 'grey', 'navy',
  'fuchsia', 'maroon', 'teal', 'orange'];
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const Chart = ({ data }) => {
  if (Object.keys(data).length === 0) {
    return <h1 style={{ textAlign: 'center', color: 'red', marginTop: '100px' }}>No results found</h1>;
  }
  const dataArr = Object.entries(data);
  return (
    <ResponsiveContainer height={height - 230}>
      <PieChart >
        <Pie
          data={dataArr.map(([name, value]) => ({ name, value }))}
          label={({ value, name }) => `${name} - ${value}`}
          labelLine
          dataKey="value"
        >
          {dataArr.map(([name, value], index) =>
            <Cell key={name} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Chart;
