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
  ...withTM({
    esModule: true
  }),
  //the env variables are set here to access in browser
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    ID_ANALYTICS: process.env.ID_ANALYTICS
  },
}
