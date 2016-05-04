'use strict';

let util = require('util');

function Greeter() {}

Greeter.prototype.welcomeMessage = function(argName) {
  let name = argName || "Stranger";
  return `Hello ${name}, welcome to this PseudoBank ATM!`;  
};

module.exports = new Greeter();