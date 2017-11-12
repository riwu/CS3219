import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, DropdownButton, MenuItem } from 'react-bootstrap';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';
import LineChart from '../components/LineChart';
import './filter.css';

const ImpactFactor = props => (
  <div>
    <Form inline className="app-form">
      <div>
        <FormGroup>
          <ControlLabel className="app-controlLabel">Top</ControlLabel>
          <FormControl
            type="number"
            value={props.impactFactor.count}
            min={1}
            max={1000}
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
            onChange={e => props.setImpactValue('year', e.target.value)}
          />
        </FormGroup>
      </div>

      <DropdownButton
        id="Chart Type"
        title={props.impactFactor.chart}
      >
        {['Line Chart', 'Bar Chart', 'Pie Chart'].map(type => (
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
    {props.impactFactor.title &&
      <h3 className="app-filterTitle">
        Top <span className="app-filterTitleSpecial">{props.impactFactor.title.count}</span>{' '}
        venue in year <span className="app-filterTitleSpecial">{props.impactFactor.title.year}</span>
      </h3>
    }
    {props.impactFactor.data && props.impactFactor.chart === 'Bar Chart' && <BarChart data={props.impactFactor.data} />}
    {props.impactFactor.data && props.impactFactor.chart === 'Pie Chart' && <PieChart data={props.impactFactor.data} />}
    {props.impactFactor.data && props.impactFactor.chart === 'Line Chart' && <LineChart data={props.impactFactor.data} />}
  </div>
);

export default ImpactFactor;
