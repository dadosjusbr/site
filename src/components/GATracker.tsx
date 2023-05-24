import { useEffect } from 'react';
import ReactGA from 'react-ga4';
// this component is a wrapper used to inject the google analytics in all children components, it connects with google analytics using the React-GA LIB https://github.com/react-ga/react-ga
const GATracker: React.FC = ({ children }) => {
  useEffect(() => {
    ReactGA.initialize(`${process.env.ID_ANALYTICS_GA4}`);
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname,
    });
  }, []);
  return <>{children}</>;
};
export default GATracker;
