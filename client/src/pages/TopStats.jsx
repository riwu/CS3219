import React from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import AreaChart from '../components/AreaChart';
import TopStatsForm from './TopStatsFormContainer';
import './filter.css';

const TopStats = props => (
  <div>
    <TopStatsForm />
    {props.title &&
      <h3 className="app-filterTitle">
        Top <span className="app-filterTitleSpecial">{props.title.count} {props.title.aggregator}</span> by
        {' '}<span className="app-filterTitleSpecial">{props.title.metric}</span>
      </h3>
    }
    {props.data && props.chart === 'Bar Chart' && <BarChart data={props.data} />}
    {props.data && props.chart === 'Pie Chart' && <PieChart data={props.data} />}
    {props.data && props.chart === 'Line Chart' && <LineChart data={props.data} />}
    {props.data && props.chart === 'Area Chart' && <AreaChart data={props.data} />}
  </div>
);

export default TopStats;
