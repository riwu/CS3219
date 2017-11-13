import { connect } from 'react-redux';
import CitationWebForm from './CitationWebForm';
import { setCitationValue, getCitationWeb } from '../actions';

const mapStateToProps = state => ({
  citationWeb: state.citationWeb,
});

export default connect(
  mapStateToProps,
  {
    setCitationValue, getCitationWeb,
  },
)(CitationWebForm);
