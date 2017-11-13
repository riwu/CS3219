import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['blue', 'green', 'red', 'black', 'purple', 'grey', 'navy',
  'fuchsia', 'maroon', 'teal', 'orange'];
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const Chart = ({ data }) => (
  <ResponsiveContainer height={height - 310}>
    <PieChart >
      <Pie
        data={data}
        label={({ value, name }) => `${name} - ${value}`}
        labelLine
        dataKey={Object.keys(data[0]).filter(key => key !== 'name')[0]}
      >
        {data.map(({ name }, index) =>
          <Cell key={name} fill={COLORS[index % COLORS.length]} />)
          }
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export default Chart;
