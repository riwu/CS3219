import React from 'react';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';
import AreaChart from '../components/AreaChart';
import './filter.css';
import CompareTrendsForm from './CompareTrendsFormContainer';

const CompareTrends = props => (
  <div style={{ display: 'flex' }}>
    <CompareTrendsForm />
    <div style={{ width: '85%' }}>
      {props.title &&
        <h3 className="app-filterTitle">
          Citations for {' '}
          <span className="app-filterTitleSpecial">
            {props.title.conferences
              .filter(([conf, year]) => conf.trim() !== '' && year.trim() !== '')
              .map(([venue, year]) => `${venue} (${year})`).join(', ')}
          </span> from year <span className="app-filterTitleSpecial">{props.title.startYear}</span> to
          year <span className="app-filterTitleSpecial">{props.title.endYear}</span>
          {props.title.filterConference &&
          <span> for papers cited from <span className="app-filterTitleSpecial">{props.title.filterConference.label}</span></span>
          }
        </h3>
      }
      {props.data && props.chart === 'Bar Chart' && <BarChart data={props.data} />}
      {props.data && props.chart === 'Line Chart' && <LineChart data={props.data} />}
      {props.data && props.chart === 'Area Chart' && <AreaChart data={props.data} />}
    </div>
  </div>
);

export default CompareTrends;
