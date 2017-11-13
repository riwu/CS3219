import { connect } from 'react-redux';
import MultiTable from './MultiTable';
import { setTrendRowValue, removeTrendRow } from '../actions';

const mapStateToProps = state => ({
  compareTrends: state.compareTrends,
  venues: state.venues,
});

export default connect(
  mapStateToProps,
  {
    setTrendRowValue, removeTrendRow,
  },
)(MultiTable);
