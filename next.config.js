const withTM = require("next-transpile-modules")
  ([
    "react-modal",
    "react-share",
    "react-apexcharts",
    "apexcharts",
  ]);
require('dotenv');
module.exports = {
  // this line is used to allow nextjs to use this esModule in ssr
  // it allows to import the lib from the es6 patter in all components
  // https://github.com/sheshbabu/react-frappe-charts#with-nextjs
  async redirects() {
    return [
      {
        source: '/download/datapackage/:path*',
        destination: '/api/download/datapackage/:path*',
        permanent: true,
      },
    ]
  },
  //the env variables are set here to access in browser
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    DEFAULT_API_BASE_URL: process.env.DEFAULT_API_BASE_URL,
    ID_ANALYTICS: process.env.ID_ANALYTICS,
    PACKAGE_REPO_URL: process.env.PACKAGE_REPO_URL,
    NEW_RELIC_APP_NAME: process.env.NEW_RELIC_APP_NAME,
    NEW_RELIC_LICENSE_KEY: process.env.NEW_RELIC_LICENSE_KEY
  },
}
