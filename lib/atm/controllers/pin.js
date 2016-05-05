'use strict';

let greeter = require('../models/greeter');
let user    = require('../models/user');

function submitPin (req, res) {

    let name = req.query.name || "";

    let context = {
        siteTitle: "Welcome to PseudoBank ATM",
        welcomeMessage: greeter.welcomeMessage(name)
    };

    let template = __dirname + '/../views/pin';
    res.render(template, context);

};

module.exports.submitPin = submitPin;