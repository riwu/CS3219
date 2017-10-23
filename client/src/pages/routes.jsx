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
    <Route exact path="/" component={TopStats} />
    <Route path="/Trends" component={Trends} />
    <Route path="/StatsByYear" component={TopVenues} />
    <Route path="/CitationWeb" component={CitationWeb} />
  </div>
);

export default Routes;
