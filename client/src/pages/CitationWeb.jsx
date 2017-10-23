import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import ForceDirectedGraph from '../components/ForceDirectedGraph';

const CitationWeb = props => (
  <div>
    <Form inline className="app-form">
      <FormGroup>
        <ControlLabel className="app-controlLabel">Base paper</ControlLabel>
        <FormControl
          value={props.citationWeb.paper}
          className="app-paperInput"
          onChange={e => props.setCitationPaper(e.target.value)}
        />
      </FormGroup>
      <Button
        bsStyle="primary"
        onClick={() => props.getCitationWeb(props.citationWeb)}
      >
        Generate
      </Button>
    </Form>
    <h3 className="app-filterTitle">
      Citation Web for <span className="app-filterTitleSpecial">{props.citationWeb.paper}</span>
    </h3>
    {props.citationWeb.data && <ForceDirectedGraph data={props.citationWeb.data} />}
  </div>
);

export default CitationWeb;
