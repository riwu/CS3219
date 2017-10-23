import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import './filter.css';

const Trends = props => (
  <div>
    <Form inline className="app-form">
      <FormGroup>
        <ControlLabel className="app-controlLabel">Venue</ControlLabel>
        <FormControl
          value={props.trends.venue}
          onChange={e => props.setTrendVenue(e.target.value)}
          placeholder="Enter a venue"
        />
      </FormGroup>
      <DropdownButton
        id="Chart Type"
        title={props.trends.chart}
      >
        {['Line Chart', 'Bar Chart', 'Pie Chart'].map(type => (
          <MenuItem
            key={type}
            onClick={() => props.setTrendChart(type)}
            active={props.trends.chart === type}
          >{type}
          </MenuItem>
        ))}
      </DropdownButton>
      <Button
        bsStyle="primary"
        onClick={() => props.getTrendStats(props.trends)}
      >
        Generate
      </Button>
    </Form>
    {props.trends.title &&
      <h3 className="app-filterTitle">
        {props.trends.title.type} trend for
        venue <span className="app-filterTitleSpecial">{props.trends.title.venue}</span>
      </h3>
    }
    {props.trends.data && props.trends.chart === 'Bar Chart' && <BarChart data={props.trends.data} />}
    {props.trends.data && props.trends.chart === 'Pie Chart' && <PieChart data={props.trends.data} />}
    {props.trends.data && props.trends.chart === 'Line Chart' && <LineChart data={props.trends.data} />}
  </div>
);

export default Trends;
