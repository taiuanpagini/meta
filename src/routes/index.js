import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Details from '../pages/Details';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/details/" component={Details} />
      </Switch>
    </BrowserRouter>
  );
}
