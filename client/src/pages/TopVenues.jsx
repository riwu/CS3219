import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import BarChart from '../components/BarChart';

const TopVenues = props => (
  <div>
    <Form inline>
      <FormGroup>
        <ControlLabel>Top</ControlLabel>
        <FormControl
          type="number"
          value={props.topVenues.count}
          min={1}
          onChange={e => props.setVenueCount(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Year</ControlLabel>
        <FormControl
          type="number"
          value={props.topVenues.year}
          min={1}
          onChange={e => props.setVenueYear(e.target.value)}
        />
      </FormGroup>
    </Form>
    <Button
      onClick={() => props.getTopVenues(props.topVenues)}
    >Generate
    </Button>
    <div>Top {props.topVenues.count} for year {props.topVenues.year}</div>
    {props.topVenues.data && <BarChart data={props.topVenues.data} />}
  </div>
);

export default TopVenues;
