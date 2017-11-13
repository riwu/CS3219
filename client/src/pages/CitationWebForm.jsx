import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const CitationWebForm = props => (
  <Form inline className="app-form">
    <FormGroup>
      <ControlLabel className="app-controlLabel">Base paper</ControlLabel>
      <FormControl
        value={props.citationWeb.paper}
        className="app-paperInput"
        onChange={e => props.setCitationPaper(e.target.value)}
        placeholder="Enter a paper"
      />
    </FormGroup>
    <FormGroup>
      <ControlLabel className="app-controlLabel">Depth</ControlLabel>
      <FormControl
        type="number"
        value={props.citationWeb.depth}
        min={1}
        max={9}
        onChange={e => props.setCitationDepth(e.target.value)}
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
