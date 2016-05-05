'use strict';

let Greeter = require('../models/greeter');
let React   = require('react');

function sayHello (req, res) {

    let name = req.query.name || "";

    let context = {
        siteTitle: "Welcome to PseudoBank ATM",
        welcomeMessage: Greeter.welcomeMessage(name),
    };

    let template = __dirname + '/../views/hello';
    res.render(template, context);

};

module.exports.sayHello = sayHello;