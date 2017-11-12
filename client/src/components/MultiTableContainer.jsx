import { connect } from 'react-redux';
import MultiTable from './MultiTable';
import { setNewTrendRow, setTrendRowValue, removeTrendRow } from '../actions';

const mapStateToProps = state => ({
  compareTrends: state.compareTrends,
});

export default connect(
  mapStateToProps,
  {
    setNewTrendRow, setTrendRowValue, removeTrendRow,
  },
)(MultiTable);
