import React from 'react';
// import { connect } from 'react-redux';
// import 'react-select/dist/react-select.css';
// import 'react-virtualized/styles.css';
// import 'react-virtualized-select/styles.css';
// import VirtualizedSelect from 'react-virtualized-select';
//
// const TitleInput = props => (
//   <VirtualizedSelect
//     options={props.titles}
//     style={{ width: '350px' }}
//     value={props.value}
//     onChange={value => props.onChange('paper', value)}
//     placeholder="Search for a paper"
//     optionHeight={({ option }) => option.label.length * 0.7}
//   />
// );
import { FormControl } from 'react-bootstrap';

// number of titles (200k) too many for VirtualizedSelect to search
const TitleInput = props => (
  <FormControl
    style={{ width: '350px' }}
    value={props.value}
    onChange={e => props.onChange('paper', e.target.value)}
    placeholder="Search for a paper"
  />
);

export default TitleInput;
