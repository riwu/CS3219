import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Nav, NavItem } from 'react-bootstrap';

const Navigation = props => (
  <Nav bsStyle="pills">
    {[
      { path: '/', title: 'Top Stats by Venue' },
      { path: '/Trends', title: 'Trends' },
      { path: '/CitationWeb', title: 'Citation Web' },
      { path: '/StatsByYear', title: 'Top Stats by year' },
    ].map(({ path, title }) => (
      <NavItem
        key={path}
        onSelect={() => props.push(path)}
        active={props.path === path}
      >
        {title}
      </NavItem>
    ))}
  </Nav>
);

const mapStateToProps = state => ({
  path: state.route.location.pathname,
});

export default connect(mapStateToProps, { push })(Navigation);
