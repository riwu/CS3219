import React from 'react';
import { Form, FormGroup, ControlLabel, Button, DropdownButton,
  MenuItem } from 'react-bootstrap';
import VenueInput from '../components/VenueInput';
import MultiTable from '../components/MultiTableContainer';
import YearInput from '../components/YearInput';
import './filter.css';

const CompareTrendsFilter = props => (
  <Form
    className="app-form"
    style={{
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <MultiTable />
    <div>
      <FormGroup>
        <ControlLabel className="app-controlLabel">From year </ControlLabel>
        <YearInput
          value={props.compareTrends.startYear}
          onChange={value => props.setTrendValue('startYear', value)}
        />
      </FormGroup>
      {' '}
      <FormGroup>
        <ControlLabel className="app-controlLabel">to year</ControlLabel>
        <YearInput
          value={props.compareTrends.endYear}
          onChange={value => props.setTrendValue('endYear', value)}
        />
      </FormGroup>
    </div>

    <FormGroup>
      <ControlLabel className="app-controlLabel">Filter conference</ControlLabel>
      <VenueInput
        value={props.compareTrends.filterConference}
        onChange={value => props.setTrendValue('filterConference', value)}
        placeholder="Search for a conference"
      />
    </FormGroup>

    <DropdownButton
      id="Chart Type"
      title={props.compareTrends.chart}
    >
      {['Line Chart', 'Bar Chart', 'Area Chart'].map(type => (
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
