import { connect } from 'react-redux';
import TopStats from './TopStats';
import { setTopValue, getTopStats } from '../actions';

const mapStateToProps = state => ({
  topStats: state.topStats,
});

export default connect(
  mapStateToProps,
  {
    setTopValue, getTopStats,
  },
)(TopStats);
