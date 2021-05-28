const withTM = require("next-transpile-modules")(["frappe-charts", "react-frappe-charts"]);
// this line is used to allow nextjs to use this esModule in ssr
// it allows to import the lib from the es6 patter in all components
// https://github.com/sheshbabu/react-frappe-charts#with-nextjs
module.exports = withTM({
  esModule: true
});
