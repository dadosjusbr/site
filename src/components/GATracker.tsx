import React from 'react';
import Script from 'next/script';
// this component is a wrapper used to inject the google analytics in all children components, it connects with google analytics using the React-GA LIB https://github.com/react-ga/react-ga
const GATracker: React.FC = () => (
  <>
    <Script
      strategy="afterInteractive"
      async
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.ID_ANALYTICS_GA4}`}
    />
    <Script
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.ID_ANALYTICS_GA4}', {
              page_path: window.location.pathname,
            });
          `,
      }}
    />
  </>
);
export default GATracker;
