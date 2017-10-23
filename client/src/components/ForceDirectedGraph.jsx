import React from 'react';
import { InteractiveForceGraph, ForceGraphNode, ForceGraphArrowLink } from 'react-vis-force';

const colors = ['red', 'blue', 'yellow'];
const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const ForceDirectedGraph = (props) => {
  const dataProps = Object.values(props.data).filter(data => data.id);
  return (
    <InteractiveForceGraph
      simulationOptions={{ height: 800, width: 800 }}
      labelAttr="label"
      zoom
    >
      {dataProps.map(({ id, depth, title }) => (
        <ForceGraphNode
          key={id}
          node={{
            id,
            label: title,
            radius: [5, 4, 3][depth],
            color: 'red',
          }}
          fill={colors[depth]}
        />
       ))}
      {dataProps.reduce((arr, { id, inCitations }) => {
          arr.push(...inCitations.map(target => ({ source: id, target })));
          return arr;
        }, []).filter(({ target }) => props.data[target])
          .map(({ source, target }) => (
            <ForceGraphArrowLink
              key={source + target}
              link={{ source, target }}
            />
          ))
        }
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
