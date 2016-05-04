var exports = module.exports;

var greeter   = require('../models/greeter');

exports.sayHello = function(req, res) {

  var name = req.query.name || "";

  var context = {
    siteTitle: "Welcome to PseudoBank ATM"
  , welcomeMessage: greeter.welcomeMessage(name)
  };

  var template = __dirname + '/../views/hello';
  res.render(template, context);

  // Just responding with a string, without any template:
  // res.status(200).send('Hello World');
};