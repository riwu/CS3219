import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, DropdownButton,
  MenuItem } from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import './filter.css';
import MultiTable from '../components/MultiTableContainer';

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
        <FormControl
          type="number"
          value={props.compareTrends.startYear}
          min={1}
          max={9999}
          style={{ width: '70px' }}
          onChange={e => props.setTrendValue('startYear', e.target.value)}
        />
      </FormGroup>
      {' '}
      <FormGroup>
        <ControlLabel className="app-controlLabel">to year</ControlLabel>
        <FormControl
          type="number"
          value={props.compareTrends.endYear}
          min={1}
          max={9999}
          style={{ width: '70px' }}
          onChange={e => props.setTrendValue('endYear', e.target.value)}
        />
      </FormGroup>
    </div>

    <FormGroup>
      <ControlLabel className="app-controlLabel">Filter conference</ControlLabel>
      <Select
        style={{ width: '200px' }}
        options={props.venues}
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
