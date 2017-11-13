import React from 'react';
import AllCharts from '../components/AllCharts';
import ImpactFactorForm from './ImpactFactorFormContainer';
import './filter.css';

const ImpactFactor = props => (
  <div>
    <ImpactFactorForm />
    {props.title &&
      <h3 className="app-filterTitle">
        Top <span className="app-filterTitleSpecial">{props.title.count}</span>{' '}
        venue in year <span className="app-filterTitleSpecial">{props.title.year}</span>
      </h3>
    }
    <AllCharts data={props.data} chart={props.chart} />
  </div>
);

export default ImpactFactor;
