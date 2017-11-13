import React from 'react';
import { BarChart, Bar } from 'recharts';
import Chart from './Chart';

const BarChartComponent = ({ data }) => (
  <Chart data={data} ChartType={BarChart} ChartFill={Bar} />
);

export default BarChartComponent;
