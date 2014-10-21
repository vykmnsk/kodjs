/**
 * Encoding/Decoding
 */
var fs = require('fs');

"use strict";
var inquirer = require("./node_modules/inquirer/lib/inquirer");
var questions = JSON.parse(fs.readFileSync('questions.json', 'utf8'))

inquirer.prompt(questions, function( answers ) {
  console.log( JSON.stringify(answers, null, "  ") );
  if (answers.doit) {
    console.log("Running...");
  }
});
