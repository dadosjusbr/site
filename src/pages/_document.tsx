import Script from 'next/script';
import { ServerStyleSheet } from 'styled-components';
import Document, {
  DocumentContext,
  Html,
  Main,
  NextScript,
  Head,
} from 'next/document';

/* eslint-disable */
const newrelic = require('newrelic');

/**
 * This document is used to create the default layout of the page like others template engines
 * https://nextjs.org/docs/advanced-features/custom-document
 */

type documentProps = {
  browserTimingHeader: string;
};
export default class MyDocument extends Document<documentProps> {
  /**
   * The getInitialProps function is used in HOC (high order components)
   * to set data before rendering, and this is used here to load the styled
   * components integration and use SASS editing in Next.js
   * https://github.com/vercel/next.js/tree/master/examples/with-styled-components
   */
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      const browserTimingHeader = newrelic.getBrowserTimingHeader({
        hasToRemoveScriptWrapper: true,
      });

      return {
        ...initialProps,
        browserTimingHeader,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  /**
   * The render function is being used similarly to how template
   * engines like handlebars load their templates, defining standards
   * that will be reused on all pages of the application, from the
   * insertion of metadata allowing utf8 as the charset of all pages
   * even importing external fonts and web scripts.
   */
  render() {
    return (
      <Html lang="pt" style={{ scrollBehavior: 'smooth' }}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/favicon.ico" type="image/x-icon" />
          <meta charSet="utf-8" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            dangerouslySetInnerHTML={{ __html: this.props.browserTimingHeader }}
            strategy="afterInteractive"
          />
        </body>
      </Html>
    );
  }
}
