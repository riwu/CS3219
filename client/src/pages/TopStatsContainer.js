import { connect } from 'react-redux';
import TopStats from './TopStats';

const mapStateToProps = state => ({
  data: state.topStats.data,
  title: state.topStats.title,
  chart: state.topStats.chart,
});

export default connect(mapStateToProps)(TopStats);
