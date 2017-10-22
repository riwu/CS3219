import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <div>
    <Link to="/">Top Stats</Link>
    <Link to="Trends">Trends</Link>
  </div>
);

export default Navigation;
