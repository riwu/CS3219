import React from 'react';
import AllCharts from '../components/AllCharts';
import TopStatsForm from './TopStatsFormContainer';
import './filter.css';

const TopStats = props => (
  <div>
    <TopStatsForm />
    {props.title &&
      <h3 className="app-filterTitle">
        Top <span className="app-filterTitleSpecial">{props.title.count} {props.title.aggregator}</span> by
        {' '}<span className="app-filterTitleSpecial">{props.title.metric}</span>
        {props.title.venue &&
          <span>
            {' '}in venue <span className="app-filterTitleSpecial">{props.title.venue.label}</span>
          </span>
        }
        {props.title.paper &&
          <span>
            {' '}for paper <span className="app-filterTitleSpecial">{props.title.paper}</span>
          </span>
        }
        {props.title.author.trim() &&
          <span>
            {' '}from author <span className="app-filterTitleSpecial">{props.title.author}</span>
          </span>
        }
      </h3>
    }
    <AllCharts data={props.data} chart={props.chart} />
  </div>
);

export default TopStats;
