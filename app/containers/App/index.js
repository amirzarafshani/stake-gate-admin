/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { hot } from 'react-hot-loader/root';
import Dashboard from 'containers/Dashboard/Loadable';
import User from 'containers/User/Loadable';
import Login from 'containers/Login/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Layout from 'components/common/layout/Layout';
import Plans from 'containers/Plans/Loadable';
import ReferralRates from 'containers/ReferralRates/Loadable';
import Assets from 'containers/Assets/Loadable';
import Releases from 'containers/Releases/Loadable';

import '../../components/common/styles/tailwind.scss';
import '../../components/common/styles/main.scss';
import withAuth from './../../components/redux/providers/withAuth';
import _ from 'lodash';

function App(props) {
  const PrivateRoute = ({ component: Component, user, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user && !_.isEmpty(user) ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  );
  return (
    <div>
      <Helmet titleTemplate="%s - Stake Gate" defaultTitle="Stake Gate">
        <meta name="description" content="A Stake Gate application" />
      </Helmet>

      <Layout>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            user={props.user}
          />
          <PrivateRoute
            exact
            path="/dashboard/users"
            component={User}
            user={props.user}
          />
          <PrivateRoute
            exact
            path="/dashboard/Plans"
            component={Plans}
            user={props.user}
          />
          <PrivateRoute
            exact
            path="/dashboard/ReferralRates"
            component={ReferralRates}
            user={props.user}
          />
          <PrivateRoute
            exact
            path="/dashboard/Assets"
            component={Assets}
            user={props.user}
          />
          <PrivateRoute
            exact
            path="/dashboard/releases"
            component={Releases}
            user={props.user}
          />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </Layout>
    </div>
  );
}
export default withAuth(hot(App));
