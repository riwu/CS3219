import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import './filter.css';

const ImpactFactorForm = props => (
  <div>
    <Form inline className="app-form">
      <div>
        <FormGroup>
          <ControlLabel className="app-controlLabel">Top</ControlLabel>
          <FormControl
            type="number"
            value={props.impactFactor.count}
            min={1}
            max={99}
            onChange={e => props.setImpactValue('count', e.target.value)}
          />
        </FormGroup>
        {' '}
        <FormGroup>
          <ControlLabel className="app-controlLabel">venue in Year</ControlLabel>
          <FormControl
            type="number"
            value={props.impactFactor.year}
            min={1}
            max={9999}
            style={{ width: '70px' }}
            onChange={e => props.setImpactValue('year', e.target.value)}
          />
        </FormGroup>
      </div>

      <DropdownButton
        id="Chart Type"
        title={props.impactFactor.chart}
      >
        {['Pie Chart', 'Bar Chart', 'Line Chart'].map(type => (
          <MenuItem
            key={type}
            onClick={() => props.setImpactValue('chart', type)}
            active={props.impactFactor.chart === type}
          >{type}
          </MenuItem>
        ))}
      </DropdownButton>
      <Button
        bsStyle="primary"
        onClick={() => props.getImpactStats(props.impactFactor)}
      >
        Generate
      </Button>
    </Form>
  </div>
);

export default ImpactFactorForm;
