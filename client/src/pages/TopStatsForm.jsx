import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, DropdownButton, MenuItem, Button } from 'react-bootstrap';
import './filter.css';

const TopStatsForm = props => (
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
            onChange={e => props.setTopValue('count', e.target.value)}
          />
        </FormGroup>
        <span className="app-dropdown">
          <DropdownButton
            id="Top Type"
            title={props.topStats.aggregator}
          >
            {['Authors', 'Venues', 'Papers', 'Years'].map(aggregator => (
              <MenuItem
                key={aggregator}
                onClick={() => props.setTopValue('aggregator', aggregator)}
                active={props.topStats.aggregator === aggregator}
              >{aggregator}
              </MenuItem>
        ))}
          </DropdownButton>
        </span>
        <span style={{ marginLeft: '10px' }}>by</span>
        <span className="app-dropdown">
          <DropdownButton
            id="Top Type"
            title={props.topStats.metric}
          >
            {['Number of papers', 'Citations made', 'Times cited', 'Number of authors', 'Number of venues'].map(metric => (
              <MenuItem
                key={metric}
                onClick={() => props.setTopValue('metric', metric)}
                active={props.topStats.metric === metric}
              >{metric}
              </MenuItem>
          ))}
          </DropdownButton>
        </span>
      </div>
      <FormGroup>
        <ControlLabel className="app-controlLabel">Graph type</ControlLabel>
        <DropdownButton
          id="Chart Type"
          title={props.topStats.chart}
        >
          {['Pie Chart', 'Bar Chart', 'Line Chart'].map(type => (
            <MenuItem
              key={type}
              onClick={() => props.setTopValue('chart', type)}
              active={props.topStats.chart === type}
            >{type}
            </MenuItem>
        ))}
        </DropdownButton>
      </FormGroup>
      <Button
        bsStyle="primary"
        onClick={() => props.getTopStats(props.topStats)}
      >
        Generate
      </Button>
    </Form>
    <div className="app-topStatFilters">
      <Form inline className="app-form">
        <h4 style={{ color: '#0084bf' }}>Optional filters</h4>
        <FormGroup>
          <ControlLabel className="app-controlLabel">Venue</ControlLabel>
          <FormControl
            value={props.topStats.venue}
            onChange={e => props.setTopValue('venue', e.target.value)}
            autoComplete="on"
            placeholder="Enter a venue"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel className="app-controlLabel">Paper</ControlLabel>
          <FormControl
            value={props.topStats.paper}
            onChange={e => props.setTopValue('paper', e.target.value)}
            autoComplete="on"
            placeholder="Enter a paper title"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel className="app-controlLabel">Author</ControlLabel>
          <FormControl
            value={props.topStats.author}
            onChange={e => props.setTopValue('author', e.target.value)}
            autoComplete="on"
            placeholder="Enter an author"
          />
        </FormGroup>
      </Form>
    </div>
  </div>
);

export default TopStatsForm;
