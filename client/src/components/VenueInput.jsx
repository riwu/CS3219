import React from 'react';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';
import Select from 'react-select';

const VenueInput = props => (
  <Select
    style={{ width: '200px' }}
    options={props.venues}
    value={props.value}
    onChange={value => props.onChange(value)}
    placeholder={props.placeholder}
  />
);

const mapStateToProps = state => ({
  venues: state.venues,
});

export default connect(mapStateToProps)(VenueInput);
