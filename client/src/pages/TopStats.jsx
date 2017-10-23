import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import BarChart from '../components/BarChart';
import './filter.css';

const TopStats = props => (
  <div>
    <Form inline className="app-form">
      <div>
        <FormGroup>
          <ControlLabel className="app-controlLabel">Top</ControlLabel>
          <FormControl
            type="number"
            value={props.topStats.count}
            min={1}
            max={1000}
            onChange={e => props.setTopCount(e.target.value)}
          />
        </FormGroup>
        <span className="app-dropdown">
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
        </span>
      </div>
      <FormGroup>
        <ControlLabel className="app-controlLabel">Venue</ControlLabel>
        <FormControl
          value={props.topStats.venue}
          onChange={e => props.setTopVenue(e.target.value)}
        />
      </FormGroup>
      <Button
        bsStyle="primary"
        onClick={() => props.getTopStats(props.topStats)}
      >
        Generate
      </Button>
    </Form>
    <h3 className="app-filterTitle">
      Top <span className="app-filterTitleSpecial">{props.topStats.count} {props.topStats.type}</span> for
      venue <span className="app-filterTitleSpecial">{props.topStats.venue}</span>
    </h3>
    {props.topStats.data && <BarChart data={props.topStats.data} />}
  </div>
);

export default TopStats;
