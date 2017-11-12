import React from 'react';
import { Route } from 'react-router-dom';
import Navigation from './Navigation';
import TopStats from '../pages/TopStatsContainer';
import ImpactFactor from './ImpactFactorContainer';
import CompareTrends from './CompareTrendsContainer';
import CitationWeb from '../pages/CitationWebContainer';

const Routes = () => (
  <div>
    <Navigation />
    <Route exact path="/" component={TopStats} />
    <Route path="/ImpactFactor" component={ImpactFactor} />
    <Route path="/Compare" component={CompareTrends} />
    <Route path="/CitationWeb" component={CitationWeb} />
  </div>
);

export default Routes;
