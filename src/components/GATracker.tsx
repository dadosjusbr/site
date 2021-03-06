import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { usePrivacityPolicy } from '../contexts/privacity-policy-context';
// this component is a wrapper used to inject the google analytics in all children components, it connects with google analytics using the React-GA LIB https://github.com/react-ga/react-ga
const GATracker: React.FC = ({ children }) => {
  const { accepted } = usePrivacityPolicy();
  useEffect(() => {
    // here we avoid the Google Analitycs until the user accept the privacity policy.
    if (accepted) {
      ReactGA.initialize(process.env.ID_ANALYTICS);
      ReactGA.pageview(window.location.pathname);
    }
  }, [accepted]);
  return <>{children}</>;
};

export default GATracker;
