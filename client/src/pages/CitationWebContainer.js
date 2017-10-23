import { connect } from 'react-redux';
import CitationWeb from './CitationWeb';
import { setCitationPaper, getCitationWeb } from '../actions';

const mapStateToProps = state => ({
  citationWeb: state.citationWeb,
});

export default connect(
  mapStateToProps,
  {
    setCitationPaper, getCitationWeb,
  },
)(CitationWeb);
