import { connect } from 'react-redux';
import CompareTrendsForm from './CompareTrendsForm';
import { setTrendValue, getTrendStats } from '../actions';

const mapStateToProps = state => ({
  compareTrends: state.compareTrends,
});

export default connect(
  mapStateToProps,
  {
    setTrendValue, getTrendStats,
  },
)(CompareTrendsForm);
