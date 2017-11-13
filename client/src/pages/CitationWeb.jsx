import React from 'react';
import ForceDirectedGraph from '../components/ForceDirectedGraph';
import CitationWebForm from './CitationWebFormContainer';

const COLORS = ['cyan', 'lightgreen', 'lightblue', 'green', 'red',
  'purple', 'grey', 'navy', 'fuchsia', 'maroon', 'teal', 'orange'];

const CitationWeb = (props) => {
  const dataProps = Object.values(props.data || {})
    .filter(item => item.id && (item.authors.length > 0));
  return (
    <div>
      <CitationWebForm />
      {props.title &&
        <h3 className="app-filterTitle">
          Citation Web for <span className="app-filterTitleSpecial">{props.title.paper}</span> at
          depth <span className="app-filterTitleSpecial">{props.title.depth}</span>
        </h3>
      }
      {props.data &&
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
              arr.push(...inCitations.filter(target => ((props.data[target]
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
