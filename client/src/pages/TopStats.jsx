import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem, Button } from 'react-bootstrap';

const TopStats = props => (
  <div>
    <Form inline>
      <FormGroup>
        <ControlLabel>Top</ControlLabel>
        <FormControl
          type="number"
          value={props.topStats.count}
          min={1}
          onChange={e => props.setTopCount(e.target.value)}
        />
      </FormGroup>
      <DropdownButton
        id="Top Type"
        title={props.topStats.type}
      >
        {['Authors', 'Papers'].map(type => (
          <MenuItem
            key={type}
            onClick={() => props.setTopType(type)}
            active={props.topStats.type === type}
          >{type}
          </MenuItem>
      ))}
      </DropdownButton>
      <FormGroup>
        <ControlLabel>Venue</ControlLabel>
        <FormControl
          value={props.topStats.venue}
          onChange={e => props.setTopVenue(e.target.value)}
        />
      </FormGroup>
    </Form>
    <Button
      onClick={() => props.getTopStats(props.topStats)}
    >Generate
    </Button>
  </div>
);

export default TopStats;
