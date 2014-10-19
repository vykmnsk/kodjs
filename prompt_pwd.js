/**
 * Encoding/Decoding
 */

"use strict";

var inquirer = require("./node_modules/inquirer/lib/inquirer");

var questions = [
  {
    type: "expand",
    message: "Che delaem?",
    name: "operation",
    choices: [
      {
        key: "r",
        name: "Raskodirovat",
        value: "decode",
      },
      {
        key: "z",
        name: "Zakodirovat",
        value: "encode",
      }
    ],
  },
  {
    type: "input",
    message: "file",
    name: "file",
  },
  {
    type: "password",
    message: "Parol?",
    name: "password"
  },
  {
    type: "confirm",
    message: "Proceed?",
    name: "doit",
    default: true
  },
];

inquirer.prompt(questions, function( answers ) {
  console.log( JSON.stringify(answers, null, "  ") );
  if (answers.doit) {
    console.log("Running...");
  }
});
