import { connect } from 'react-redux';
import ImpactFactorForm from './ImpactFactorForm';
import { setImpactValue, getImpactStats } from '../actions';

const mapStateToProps = state => ({
  impactFactor: state.impactFactor,
});

export default connect(
  mapStateToProps,
  {
    setImpactValue, getImpactStats,
  },
)(ImpactFactorForm);
