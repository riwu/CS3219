import { connect } from 'react-redux';
import ImpactFactor from './ImpactFactor';

const mapStateToProps = state => ({
  data: state.impactFactor.data,
  title: state.impactFactor.title,
  chart: state.impactFactor.chart,
});

export default connect(mapStateToProps)(ImpactFactor);
