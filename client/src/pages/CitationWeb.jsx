import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import ForceDirectedGraph from '../components/ForceDirectedGraph';

const CitationWeb = props => (
  <div>
    <Form inline>
      <FormGroup>
        <ControlLabel>Base paper</ControlLabel>
        <FormControl
          value={props.citationWeb.paper}
          onChange={e => props.setCitationPaper(e.target.value)}
        />
      </FormGroup>
    </Form>
    <Button
      onClick={() => props.getCitationWeb(props.citationWeb)}
    >Generate
    </Button>
    <div>Citation Web for {props.citationWeb.paper}</div>
    {props.citationWeb.data && <ForceDirectedGraph data={props.citationWeb.data} />}
  </div>
);

export default CitationWeb;
