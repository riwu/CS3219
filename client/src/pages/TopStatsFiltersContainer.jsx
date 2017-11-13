import { connect } from 'react-redux';
import TopStatsFilters from './TopStatsFilters';
import { setTopValue, getTopStats } from '../actions';

const mapStateToProps = state => ({
  topStats: state.topStats,
});

export default connect(
  mapStateToProps,
  {
    setTopValue, getTopStats,
  },
)(TopStatsFilters);
