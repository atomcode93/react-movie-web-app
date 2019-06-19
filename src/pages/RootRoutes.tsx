import * as React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
// COMPONENTS
import { MainRoute } from 'components/Layout/RouteTemplates';
import {
  NotFound,
  Login,
  // Main
  ComingSoon,
  Discover,
  Movie,
  Popular,
  TopRated,
  Favorites,
  WatchLater,
  SearchResults,
} from './routes';

// EXPORTED ROUTES
const Routes = () => (
  <Switch>
    <MainRoute exact path="/login" component={Login} />
    <MainRoute exact path="/coming-soon" component={ComingSoon} />
    <MainRoute exact path="/" component={Discover} />
    <MainRoute exact path="/popular" component={Popular} />
    <MainRoute exact path="/top-rated" component={TopRated} />
    <MainRoute exact path="/favorites" component={Favorites} />
    <MainRoute exact path="/watch-later" component={WatchLater} />
    <MainRoute exact path="/search" component={SearchResults} />
    <MainRoute exact path="/movie/:id-:title" component={Movie} />
    <Route path="/404" component={NotFound} />
    <Redirect to="/404" />
  </Switch>
);

export default Routes;
