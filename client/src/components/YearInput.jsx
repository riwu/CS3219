import React from 'react';
import { FormControl } from 'react-bootstrap';

const YearInput = props => (
  <FormControl
    style={{ width: '75px' }}
    type="number"
    value={props.value}
    min={1}
    max={9999}
    onChange={e => props.onChange(e.target.value)}
  />
);

export default YearInput;
