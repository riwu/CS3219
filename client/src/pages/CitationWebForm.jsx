import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import TitleInput from '../components/TitleInput';

const CitationWebForm = props => (
  <Form inline className="app-form">
    <FormGroup style={{ display: 'flex', alignItems: 'center' }}>
      <ControlLabel className="app-controlLabel">Base paper</ControlLabel>
      <TitleInput
        value={props.citationWeb.paper}
        onChange={props.setCitationValue}
      />
    </FormGroup>
    <FormGroup>
      <ControlLabel className="app-controlLabel">Depth</ControlLabel>
      <FormControl
        type="number"
        value={props.citationWeb.depth}
        min={1}
        max={9}
        onChange={e => props.setCitationValue('depth', e.target.value)}
      />
    </FormGroup>
    <Button
      bsStyle="primary"
      onClick={() => props.getCitationWeb(props.citationWeb)}
    >
      Generate
    </Button>
  </Form>
);

export default CitationWebForm;
