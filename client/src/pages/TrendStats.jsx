import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
// import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

const Trends = props => (
  <div>
    <Form inline>
      {props.trends.type}
      <FormGroup>
        <ControlLabel>Venue</ControlLabel>
        <FormControl
          value={props.trends.venue}
          onChange={e => props.setTrendVenue(e.target.value)}
        />
      </FormGroup>
    </Form>
    <Button
      onClick={() => props.getTrendStats(props.trends)}
    >Generate
    </Button>
    <div>{props.trends.type} trend for venue {props.trends.venue}</div>
    {props.trends.data && <LineChart data={props.trends.data} />}
  </div>
);

export default Trends;
