import { connect } from 'react-redux';
import CitationWebForm from './CitationWebForm';
import { setCitationPaper, getCitationWeb, setCitationDepth } from '../actions';

const mapStateToProps = state => ({
  citationWeb: state.citationWeb,
});

export default connect(
  mapStateToProps,
  {
    setCitationPaper, getCitationWeb, setCitationDepth,
  },
)(CitationWebForm);
