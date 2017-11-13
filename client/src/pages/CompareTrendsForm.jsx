import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, DropdownButton,
  MenuItem } from 'react-bootstrap';
import './filter.css';
import MultiTable from '../components/MultiTableContainer';

const CompareTrendsFilter = props => (
  <Form inline className="app-form">
    <MultiTable />
    <div>
      <FormGroup>
        <ControlLabel className="app-controlLabel">From year </ControlLabel>
        <FormControl
          type="number"
          value={props.compareTrends.startYear}
          min={1}
          max={9999}
          onChange={e => props.setTrendValue('startYear', e.target.value)}
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
          onChange={e => props.setTrendValue('endYear', e.target.value)}
        />
      </FormGroup>
    </div>

    <DropdownButton
      id="Chart Type"
      title={props.compareTrends.chart}
    >
      {['Line Chart', 'Bar Chart'].map(type => (
        <MenuItem
          key={type}
          onClick={() => props.setTrendValue('chart', type)}
          active={props.compareTrends.chart === type}
        >{type}
        </MenuItem>
        ))}
    </DropdownButton>
    <Button
      bsStyle="primary"
      onClick={() => props.getTrendStats(props.compareTrends)}
    >
        Generate
    </Button>
  </Form>
);

export default CompareTrendsFilter;
