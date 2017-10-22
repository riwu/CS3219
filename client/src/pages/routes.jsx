import React from 'react';
import { Route } from 'react-router-dom';
import TopStats from '../pages/TopStatsContainer';

const Routes = () => (
  <Route exact path="/" component={TopStats} />
);

export default Routes;
