import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Navigation from './Navigation';
import { useRouteMatch } from 'react-router-dom';
import withAuth from '../../redux/providers/withAuth';

const outOfLayoutLocations = ['/'];

const Layout = (props) => {
  function IsOutOfLayoutRoute() {
    var res = false;
    outOfLayoutLocations.forEach((item) => {
      const match = useRouteMatch(item);
      if (match && match.isExact) {
        res = true;
      }
    });

    return res;
  }

  const { children } = props;
  return (
    <React.Fragment>
      <ToastContainer
        position="top-left"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnVisibilityChange
        draggable
        pauseOnHover
        // autoClose={false}
      />

      {IsOutOfLayoutRoute() ? (
        children
      ) : (
        <React.Fragment>
          <Navigation>{children}</Navigation>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withAuth(Layout);
