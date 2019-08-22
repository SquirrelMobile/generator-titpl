/**
 * Classe utilitaire pour faire de log.
 *
 * Exemple :
 * log.info("tutu", {toto: "tata}, [1, 2, 3]);
 *
 */

var Alloy = require("alloy"),
  _ = Alloy._;
const enabled = Alloy.CFG.logEnable;
module.exports = {
  debug: function logDebug() {
    !ENV_PROD && enabled && Ti.API.debug(stringify(arguments));
  },
  error: function logError(props) {
    !ENV_PROD && enabled && Ti.API.error(stringify(arguments));
  },
  info: function logInfo() {
    !ENV_PROD && enabled && Ti.API.info(stringify(arguments));
  },
  warn: function logWarn() {
    !ENV_PROD && enabled && Ti.API.warn(stringify(arguments));
  }
  // print: function (o, title) {
  // 	if (title) {
  // 		Ti.API.info('\n---> ' + title + ' ');
  // 	}
  // 	Ti.API.info(o);
  // 	Ti.API.info(JSON.stringify(o || "null", null, '   '));
  // 	Ti.API.info(' ');
  // }
};

/*
 * logs args with logFn to console
 * - logFn Function logging function
 * - args Array(like) collection of objects (e.g. arguments) that need to be logged
 */
function stringify(args) {
  args = _.map(args, function(item) {
    if (!item || !_.isObject(item)) {
      return item;
    }
    //Ti.API.info(item);
    return JSON.stringify(item);
  });
  return [].join.call(args, " ");
}
