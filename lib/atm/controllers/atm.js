'use strict';

let greeter = require('../models/greeter');
let user    = require('../models/user');

function pseudoAtm (req, res) {

    let name = req.query.name || "";

    let context = {
        siteTitle: "Welcome to PseudoBank ATM",
        welcomeMessage: greeter.welcomeMessage(name)
    };

    let template = __dirname + '/../views/atm';
    res.render(template, context);

};

module.exports.pseudoAtm = pseudoAtm;