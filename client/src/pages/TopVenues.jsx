import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import './filter.css';

const TopVenues = props => (
  <div>
    <Form inline className="app-form">
      <FormGroup>
        <ControlLabel className="app-controlLabel">Top</ControlLabel>
        <FormControl
          type="number"
          value={props.topVenues.count}
          min={1}
          max={1000}
          onChange={e => props.setVenueCount(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel className="app-controlLabel">Year</ControlLabel>
        <FormControl
          type="number"
          value={props.topVenues.year}
          min={1}
          max={9999}
          onChange={e => props.setVenueYear(e.target.value)}
        />
      </FormGroup>
      <DropdownButton
        id="Chart Type"
        title={props.topVenues.chart}
      >
        {['Pie Chart', 'Bar Chart', 'Line Chart'].map(type => (
          <MenuItem
            key={type}
            onClick={() => props.setVenueChart(type)}
            active={props.topVenues.chart === type}
          >{type}
          </MenuItem>
        ))}
      </DropdownButton>
      <Button
        bsStyle="primary"
        onClick={() => props.getTopVenues(props.topVenues)}
      >
        Generate
      </Button>
    </Form>
    {props.topVenues.title &&
      <h3 className="app-filterTitle">
        Top <span className="app-filterTitleSpecial">{props.topVenues.title.count}</span> for
        year <span className="app-filterTitleSpecial">{props.topVenues.title.year}</span>
      </h3>
    }
    {props.topVenues.data && props.topVenues.chart === 'Bar Chart' && <BarChart data={props.topVenues.data} />}
    {props.topVenues.data && props.topVenues.chart === 'Pie Chart' && <PieChart data={props.topVenues.data} />}
    {props.topVenues.data && props.topVenues.chart === 'Line Chart' && <LineChart data={props.topVenues.data} />}
  </div>
);

export default TopVenues;
