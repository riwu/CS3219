import { connect } from 'react-redux';
import CitationWeb from './CitationWeb';

const mapStateToProps = state => ({
  data: state.citationWeb.data,
});

export default connect(mapStateToProps)(CitationWeb);
