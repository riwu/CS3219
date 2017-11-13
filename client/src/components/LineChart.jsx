import React from 'react';
import { LineChart, Line } from 'recharts';
import Chart from './Chart';

const LineChartComponent = ({ data }) => (
  <Chart data={data} ChartType={LineChart} ChartFill={Line} />
);

export default LineChartComponent;
