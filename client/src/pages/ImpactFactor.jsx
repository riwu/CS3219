import React from 'react';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import './filter.css';
import ImpactFactorForm from './ImpactFactorFormContainer';

const ImpactFactor = props => (
  <div>
    <ImpactFactorForm />
    {props.title &&
      <h3 className="app-filterTitle">
        Top <span className="app-filterTitleSpecial">{props.title.count}</span>{' '}
        venue in year <span className="app-filterTitleSpecial">{props.title.year}</span>
      </h3>
    }
    {props.data && props.chart === 'Bar Chart' && <BarChart data={props.data} />}
    {props.data && props.chart === 'Pie Chart' && <PieChart data={props.data} />}
    {props.data && props.chart === 'Line Chart' && <LineChart data={props.data} />}
  </div>
);

export default ImpactFactor;
