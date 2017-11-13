import { connect } from 'react-redux';
import TopStatsForm from './TopStatsForm';
import { setTopValue, getTopStats } from '../actions';

const mapStateToProps = state => ({
  topStats: state.topStats,
  venues: state.venues,
  titles: state.titles,
});

export default connect(
  mapStateToProps,
  {
    setTopValue, getTopStats,
  },
)(TopStatsForm);
