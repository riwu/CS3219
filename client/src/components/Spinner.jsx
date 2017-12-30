import React from 'react';
import { connect } from 'react-redux';
import { FadingCircle } from 'better-react-spinkit';
import './Spinner.css';

const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
const Spinner = props => props.isFetching && <FadingCircle size={width / 4} className="Spinner" />;

export default connect(state => ({ isFetching: state.isFetching }))(Spinner);
