import React from 'react';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const ForceDirectedGraph = (props) => {
  const dataProps = Object.values(props.data).filter(data => data.id);
  console.log(dataProps);
  return (
    <InteractiveForceGraph
      simulationOptions={{ height: width, width }}
      labelAttr="label"
      onSelectNode={node => console.log(node)}
      highlightDependencies
      zoom
    >
      {dataProps.map(({ id, depth, title }) => (
        <ForceGraphNode
          key={id}
          node={{
            id,
            label: title,
            radius: 5 / ((depth || -1) + 2),
            color: 'red',
          }}
          fill={depth}
        />
       ))}
      {dataProps.reduce((arr, { id, inCitations }) => [
           ...arr,
           ...inCitations.map(target => ({
                   source: id,
                   target,
            })),
         ], []).filter(({ source, target }) => props.data[target]).map(({ source, target }) => (
           <ForceGraphLink key={source + target} link={{ source, target }} />
          ))}
    </InteractiveForceGraph>
  );
};


// import ForceDirectedGraphVis from './ForceDirectedGraphVis';
// import LesMisData from './les-mis-data.json';
//
// export default class ForceDirectedExample extends React.Component {
//   state = {
//     strength: Math.random() * 60 - 30,
//   }
//
//   render() {
//     const { strength } = this.state;
//     const dataProps = Object.values(this.props.data);
//     // const data = {
//     //   nodes: dataProps.map(({ id, depth }) => ({
//     //     id,
//     //     group: depth,
//     //     color: depth,
//     //   })),
//     //   links: dataProps.reduce(({id, inCitations})=> ({
//     //     source: id,
//     //     target:
//     //   }))
//     // };
//     return (
//       <div className="force-directed-example">
//         <button
//           className="showcase-button"
//           onClick={() => this.setState({ strength: Math.random() * 60 - 30 })}
//         > REWEIGHT
//         </button>
//         <ForceDirectedGraphVis
//           data={LesMisData}
//           height={500}
//           width={500}
//           animation
//           strength={strength}
//         />
//       </div>
//     );
//   }
// }

export default ForceDirectedGraph;
