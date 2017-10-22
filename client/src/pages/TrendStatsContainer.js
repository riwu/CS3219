import { connect } from 'react-redux';
import TrendStats from './TrendStats';
import { setTrendType, setTrendVenue, getTrendStats } from '../actions';

const mapStateToProps = state => ({
  trends: state.trends,
});

export default connect(
  mapStateToProps,
  {
    setTrendType, setTrendVenue, getTrendStats,
  },
)(TrendStats);
