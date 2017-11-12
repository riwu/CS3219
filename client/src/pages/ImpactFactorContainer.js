import { connect } from 'react-redux';
import ImpactFactor from './ImpactFactor';
import { setImpactValue, getImpactStats } from '../actions';

const mapStateToProps = state => ({
  impactFactor: state.impactFactor,
});

export default connect(
  mapStateToProps,
  {
    setImpactValue, getImpactStats,
  },
)(ImpactFactor);
