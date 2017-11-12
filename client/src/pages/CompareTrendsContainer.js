import { connect } from 'react-redux';
import CompareTrends from './CompareTrends';
import { setImpactValue, getImpactStats } from '../actions';

const mapStateToProps = state => ({
  compareTrends: state.compareTrends,
});

export default connect(
  mapStateToProps,
  {
    setImpactValue, getImpactStats,
  },
)(CompareTrends);
