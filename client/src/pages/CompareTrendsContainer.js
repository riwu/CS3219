import { connect } from 'react-redux';
import CompareTrends from './CompareTrends';
import { setTrendValue, getTrendStats } from '../actions';

const mapStateToProps = state => ({
  compareTrends: state.compareTrends,
});

export default connect(
  mapStateToProps,
  {
    setTrendValue, getTrendStats,
  },
)(CompareTrends);
