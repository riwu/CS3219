import React from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import AreaChart from '../components/AreaChart';

const AllCharts = ({ chart, data }) => {
  if (data === null) {
    return null;
  }
  if (data.length === 0) {
    return <h1 style={{ textAlign: 'center', color: 'red', marginTop: '100px' }}>No results found</h1>;
  }
  switch (chart) {
    case 'Bar Chart':
      return <BarChart data={data} />;
    case 'Pie Chart':
      return <PieChart data={data} />;
    case 'Line Chart':
      return <LineChart data={data} />;
    case 'Area Chart':
      return <AreaChart data={data} />;
    default:
      console.error(`Invalid chart type: ${chart}`);
      return null;
  }
};

export default AllCharts;
