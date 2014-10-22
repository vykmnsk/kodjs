/**
 * Encoding/Decoding
 */

var fs = require('fs');
var CryptoJS = require('./node_modules/crypto-js');

"use strict"

var inquirer = require("./node_modules/inquirer/lib/inquirer");
var questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

function encode(text, pwd) {
    var encrypted = CryptoJS.AES.encrypt("Test Message", pwd);
    console.log(encrypted.toString());
}

function decode(code, pwd) {
  var decrypted = CryptoJS.AES.decrypt(code, pwd);
  var decr_msg = decrypted.toString(CryptoJS.enc.Utf8);
  console.log(decr_msg);
}

inquirer.prompt(questions, function( answers ) {
  console.log( JSON.stringify(answers, null, "  ") );

  if ('encode' == answers.operation) {
    var text = 'Sovershenno Sekretno!';
    encode(text, answers.pwd);
  } else if ('decode' == answers.operation) {
    var code = 'U2FsdGVkX18+puhcxaXIqts2jJD7TxDpRvNrAdAbnow=';
    decode(code, answers.pwd);
  } else {
    throw 'Err! Unknownd operation';
  }

});
