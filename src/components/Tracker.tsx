import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

// this component is a wrapper used to inject the google analytics in all children components, it connects with google analytics using the React-GA LIB https://github.com/react-ga/react-ga
const Tracker: React.FC = ({ children }) => {
  useEffect(() => {
    ReactGA.initialize(process.env.ID_ANALYTICS);
    ReactGA.pageview(window.location.pathname);
  });
  return <>{children}</>;
};

export default Tracker;
