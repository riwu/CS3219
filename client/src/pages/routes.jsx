import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from './Navigation';
import TopStats from '../pages/TopStatsContainer';
import Trends from '../pages/TrendStatsContainer';
import TopVenues from '../pages/TopVenuesContainer';
import CitationWeb from '../pages/CitationWebContainer';

const Routes = () => (
  <div>
    <Navigation />
    <Route exact path="/assignment4-pair25" component={TopStats} />
    <Route path="/assignment4-pair25/Trends" component={Trends} />
    <Route path="/assignment4-pair25/StatsByYear" component={TopVenues} />
    <Route path="/assignment4-pair25/CitationWeb" component={CitationWeb} />
  </div>
);

export default Routes;
