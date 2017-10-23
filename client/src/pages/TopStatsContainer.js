import { connect } from 'react-redux';
import TopStats from './TopStats';
import { setTopCount, setTopType, setTopVenue, getTopStats, setTopChart } from '../actions';

const mapStateToProps = state => ({
  topStats: state.topStats,
});

export default connect(
  mapStateToProps,
  {
    setTopCount, setTopType, setTopVenue, getTopStats, setTopChart,
  },
)(TopStats);
