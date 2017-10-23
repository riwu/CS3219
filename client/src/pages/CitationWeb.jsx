import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import ForceDirectedGraph from '../components/ForceDirectedGraph';

const COLORS = ['cyan', 'lightgreen', 'lightblue', 'green', 'red',
  'purple', 'grey', 'navy', 'fuchsia', 'maroon', 'teal', 'orange'];

const CitationWeb = (props) => {
  const dataProps = Object.values(props.citationWeb.data || {})
    .filter(item => item.id && (item.authors.length > 0));
  return (
    <div>
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
      {props.citationWeb.title &&
        <h3 className="app-filterTitle">
          Citation Web for <span className="app-filterTitleSpecial">{props.citationWeb.title.paper}</span> at
          depth <span className="app-filterTitleSpecial">{props.citationWeb.title.depth}</span>
        </h3>
      }
      {props.citationWeb.data &&
        <ForceDirectedGraph
          data={{
            nodes: dataProps.map(({
               id, depth, title, authors,
              }) => ({
               id,
               label: `${title} (${authors.join(', ')})`,
               radius: 10 - (depth === undefined ? -2 : depth),
               fill: depth === undefined ? 'orange' : COLORS[depth % COLORS.length],
             })),
            links: dataProps.reduce((arr, { id, inCitations }) => {
              arr.push(...inCitations.filter(target => ((props.citationWeb.data[target]
                || {}).authors || []).length).map(target => ({ source: id, target })));
              return arr;
            }, []),
          }}
        />
      }
    </div>
  );
};

export default CitationWeb;
