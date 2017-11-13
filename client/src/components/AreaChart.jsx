import React from 'react';
import { AreaChart, Area } from 'recharts';
import Chart from './Chart';

const BarChartComponent = ({ data }) => (
  <Chart data={data} ChartType={AreaChart} ChartFill={Area} />
);

export default BarChartComponent;
