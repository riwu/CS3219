import React from 'react';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import './filter.css';
import CompareTrendsForm from './CompareTrendsFormContainer';

const CompareTrends = props => (
  <div style={{ display: 'flex' }}>
    <CompareTrendsForm />
    <div style={{ width: '85%' }}>
      {props.title &&
        <h3 className="app-filterTitle">
          Trends for
          <span className="app-filterTitleSpecial">
            {props.title.conferences.join(',')}
          </span>
          Top <span className="app-filterTitleSpecial">{props.title.count}</span> for
          year <span className="app-filterTitleSpecial">{props.title.year}</span>
        </h3>
      }
      {props.data && props.chart === 'Bar Chart' && <BarChart data={props.data} />}
      {props.data && props.chart === 'Line Chart' && <LineChart data={props.data} />}
    </div>
  </div>
);

export default CompareTrends;
