import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
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
        />
      </FormGroup>
      <Button
        bsStyle="primary"
        onClick={() => props.getTrendStats(props.trends)}
      >
        Generate
      </Button>
    </Form>
    <h3 className="app-filterTitle">
      {props.trends.type} trend for
      venue <span className="app-filterTitleSpecial">{props.trends.venue}</span>
    </h3>
    {props.trends.data && <LineChart data={props.trends.data} />}
  </div>
);

export default Trends;
