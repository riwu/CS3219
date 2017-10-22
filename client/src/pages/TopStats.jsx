import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem } from 'react-bootstrap';

const TopStats = props => (
  <div>
    <Form inline>
      <FormGroup>
        <ControlLabel>Top</ControlLabel>
        <FormControl
          type="number"
          value={props.topInput}
          min={1}
          onChange={e => props.setTopInput(e.target.value)}
        />
      </FormGroup>
      <DropdownButton
        id="Top Type"
        title={props.topType}
      >
        {['Authors', 'Papers'].map(type => (
          <MenuItem
            key={type}
            onClick={() => props.setTopType(type)}
            active={props.topType === type}
          >{type}
          </MenuItem>
      ))}
      </DropdownButton>
    </Form>
  </div>
);

export default TopStats;
