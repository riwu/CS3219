import { connect } from 'react-redux';
import CompareTrends from './CompareTrends';

const mapStateToProps = state => ({
  data: state.compareTrends.data,
  chart: state.compareTrends.chart,
  title: state.compareTrends.title,
});

export default connect(mapStateToProps)(CompareTrends);
