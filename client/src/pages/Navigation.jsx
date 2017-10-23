import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Nav, NavItem } from 'react-bootstrap';
import './Navigation.css';

const Navigation = props => (
  <Nav bsStyle="tabs" className="Navigation">
    {[
      { path: '/assignment4-pair25', title: 'Top stats by venue' },
      { path: '/assignment4-pair25/StatsByYear', title: 'Top stats by year' },
      { path: '/assignment4-pair25/Trends', title: 'Trends' },
      { path: '/assignment4-pair25/CitationWeb', title: 'Citation web' },
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
