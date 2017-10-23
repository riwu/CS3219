import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['blue', 'green', 'red', 'black', 'purple', 'grey', 'navy',
  'fuchsia', 'maroon', 'teal', 'orange'];
const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const Chart = props => (
  <ResponsiveContainer height={height - 230}>
    <PieChart >
      <Pie
        data={Object.entries(props.data).map(([name, value]) => ({ name, value }))}
        label={({ value, name }) => `${name} - ${value}`}
        labelLine
      >
        {Object.entries(props.data).map((entry, index) =>
          <Cell fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

export default Chart;
