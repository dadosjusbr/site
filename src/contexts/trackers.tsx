import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

const TrackingContext = React.createContext({});
// this track context uses the react context api to create a wrapper with analytics to all aplication, he's like a component, but it allows to access props in other react components to improve the usability https://pt-br.reactjs.org/docs/context.html

function TrackingProvider(props) {
  useEffect(() => {
    ReactGA.initialize(process.env.ID_ANALYTICS);
    ReactGA.pageview(window.location.pathname);
  });
  return <TrackingContext.Provider {...props} />;
}

const useTracking = () => React.useContext(TrackingContext);

export { TrackingProvider, useTracking };
