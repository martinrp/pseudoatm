require('app-module-path').addPath(__dirname + '/lib');

exports.setup = function(runningApp, callback) {
  // Nothing ever comes from "x-powered-by", but a security hole
  runningApp.disable("x-powered-by");

  // Setup view engine(s)
  runningApp.set('view engine', 'hbs');
  runningApp.engine('handlebars', require('hbs').__express);

  //---- Mounting application modules
  runningApp.use('/', require('atm'));

  if(typeof callback === 'function') {
    callback(runningApp);
  }
};
