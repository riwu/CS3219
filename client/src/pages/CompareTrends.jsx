import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import './filter.css';

const CompareTrends = props => (
  <div>
    <Form inline className="app-form">
      <FormGroup>
        <ControlLabel className="app-controlLabel">Top</ControlLabel>
        <FormControl
          type="number"
          value={props.compareTrends.count}
          min={1}
          max={1000}
          onChange={e => props.setVenueCount(e.target.value)}
        />
      </FormGroup>
      <div>
        <FormGroup>
          <ControlLabel className="app-controlLabel">From year </ControlLabel>
          <FormControl
            type="number"
            value={props.compareTrends.startYear}
            min={1}
            max={9999}
            onChange={e => props.setImpactValue('startYear', e.target.value)}
          />
        </FormGroup>
        {' '}
        <FormGroup>
          <ControlLabel className="app-controlLabel">to</ControlLabel>
          <FormControl
            type="number"
            value={props.compareTrends.endYear}
            min={1}
            max={9999}
            onChange={e => props.setImpactValue('endYear', e.target.value)}
          />
        </FormGroup>
      </div>

      <DropdownButton
        id="Chart Type"
        title={props.compareTrends.chart}
      >
        {['Pie Chart', 'Bar Chart', 'Line Chart'].map(type => (
          <MenuItem
            key={type}
            onClick={() => props.setVenueChart(type)}
            active={props.compareTrends.chart === type}
          >{type}
          </MenuItem>
        ))}
      </DropdownButton>
      <Button
        bsStyle="primary"
        onClick={() => props.getTopVenues(props.compareTrends)}
      >
        Generate
      </Button>
    </Form>
    {props.compareTrends.title &&
      <h3 className="app-filterTitle">
        Top <span className="app-filterTitleSpecial">{props.compareTrends.title.count}</span> for
        year <span className="app-filterTitleSpecial">{props.compareTrends.title.year}</span>
      </h3>
    }
    {props.compareTrends.data && props.compareTrends.chart === 'Bar Chart' && <BarChart data={props.compareTrends.data} />}
    {props.compareTrends.data && props.compareTrends.chart === 'Pie Chart' && <PieChart data={props.compareTrends.data} />}
    {props.compareTrends.data && props.compareTrends.chart === 'Line Chart' && <LineChart data={props.compareTrends.data} />}
  </div>
);

export default CompareTrends;
