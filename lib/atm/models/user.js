'use strict';

let util = require('util');

function User() {}

User.prototype.getPin = function(id) {
  return '1234';
};

module.exports = new User();