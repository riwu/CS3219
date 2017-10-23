import { connect } from 'react-redux';
import TopVenues from './TopVenues';
import { setVenueCount, setVenueYear, getTopVenues, setVenueChart } from '../actions';

const mapStateToProps = state => ({
  topVenues: state.topVenues,
});

export default connect(
  mapStateToProps,
  {
    setVenueCount, setVenueYear, getTopVenues, setVenueChart,
  },
)(TopVenues);