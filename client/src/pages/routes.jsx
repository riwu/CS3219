import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from './Navigation';
import TopStats from '../pages/TopStatsContainer';
import Trends from '../pages/TrendStatsContainer';

const Routes = () => (
  <div>
    <Navigation />
    <Route exact path="/" component={TopStats} />
    <Route path="/Trends" component={Trends} />
  </div>
);

export default Routes;
