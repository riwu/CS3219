import React from 'react';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphArrowLink } from './react-vis-force';

const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const ForceDirectedGraph = ({ data }) => {
  if (!(data.nodes || {}).length) {
    return <h1 style={{ textAlign: 'center', color: 'red', marginTop: '100px' }}>No results found</h1>;
  }
  return (
    <InteractiveForceGraph
      simulationOptions={{ height: height - 240, width }}
      labelAttr="label"
      zoom
      highlightDependencies
      data={data}
    >
      {data.nodes.map(({
             id, radius, label, fill,
            }) => (
              <ForceGraphNode
                key={id}
                node={{
                  id,
                  label,
                  radius,
                }}
                fill={fill}
              />
         ))}
      {data.links.map(({ source, target }) => (
        <ForceGraphArrowLink
          key={source + target}
          link={{ source, target, value: 1 }}
        />
        ))}
    </InteractiveForceGraph>
  );
};

export default ForceDirectedGraph;
