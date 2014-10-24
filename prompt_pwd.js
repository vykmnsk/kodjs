/**
 * Encoding/Decoding
 */

var fs = require('fs');
var CryptoJS = require('./node_modules/crypto-js');
var ENC_EXT = 'kod'

"use strict"

var inquirer = require("./node_modules/inquirer/lib/inquirer");
var questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

function readFileData(file, callback, callParams) {
  console.log("reading %s ...", file);
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
    callback.apply(null, [data].concat(callParams));
    });
}

function writeFileData(file, data) {
  console.log("writing %s ...", file);
  fs.writeFile(file, data, function (err) {
    if (err) throw err;
    });
}

function replaceFileExt(fileIn, newExt) {
  var fileParts = fileIn.split(".");
  if (fileParts.length < 2) throw "Problem with input file path: " + fileIn;
  fileParts[fileParts.length -1] = newExt;
  fileOut = fileParts.join('.');
  return fileOut;
}

function encode(text, pwd, file) {
  var encrypted = CryptoJS.AES.encrypt(text, pwd);
  var encText = encrypted.toString()
  writeFileData(replaceFileExt(file, ENC_EXT), encText)
  logFormatted(encText)
}

function decode(code, pwd) {
  var decrypted = CryptoJS.AES.decrypt(code, pwd);
  var decrText = decrypted.toString(CryptoJS.enc.Utf8);
  logFormatted(decrText);
}

function logFormatted(msg){
  console.log("--------------------------------------------");
  console.log(msg);
  console.log("--------------------------------------------");
}

inquirer.prompt(questions, function( answers ) {
  console.log( JSON.stringify(answers, null, "  ") );

  if ('encode' == answers.operation) {
    // var text = 'Sovershenno Sekretno!';
    // encode(text, answers.pwd);
    readFileData(answers.file, encode, [answers.pwd, answers.file]);
  } else if ('decode' == answers.operation) {
    readFileData(answers.file, decode, [answers.pwd]);
  } else {
    throw 'Err! Unknownd operation';
  }

});
