'use strict';

let util = require('util');

function Greeter() {}

Greeter.prototype.welcomeMessage = function(argName) {
  let name = argName || "Stranger";
  return util.format('Hello %s! Welcome to NodeBootstrap!', name);  
};

// Typical CRUD

Greeter.prototype.find = function(id) {
  let lookupby = id;
  return lookupby; // Fake code to explain the point
  // @TODO
};

Greeter.prototype.save = function() {
  // @TODO
};

Greeter.prototype.delete = function() {
  // @TODO
};

module.exports = new Greeter();