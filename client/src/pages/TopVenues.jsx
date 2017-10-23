import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import BarChart from '../components/BarChart';
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
      <Button
        bsStyle="primary"
        onClick={() => props.getTopVenues(props.topVenues)}
      >
        Generate
      </Button>
    </Form>
    <h3 className="app-filterTitle">
      Top <span className="app-filterTitleSpecial">{props.topVenues.count}</span> for
      year <span className="app-filterTitleSpecial">{props.topVenues.year}</span>
    </h3>
    {props.topVenues.data && <BarChart data={props.topVenues.data} />}
  </div>
);

export default TopVenues;
