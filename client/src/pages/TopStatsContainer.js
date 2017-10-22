import { connect } from 'react-redux';
import TopStats from './TopStats';
import { setTopInput, setTopType } from '../actions';

const mapStateToProps = state => ({
  topInput: state.topInput,
  topType: state.topType,
});

export default connect(
  mapStateToProps,
  { setTopInput, setTopType },
)(TopStats);
