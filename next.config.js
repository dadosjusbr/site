const withTM = require("next-transpile-modules")(["frappe-charts", "react-frappe-charts"]);
module.exports = withTM({
  esModule: true
});
