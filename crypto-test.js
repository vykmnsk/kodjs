"use strict";

var CryptoJS = require('./node_modules/crypto-js');

var pwd = "Secret Passphrase";
var encrypted = CryptoJS.AES.encrypt("Test Message", pwd);
// var enc_msg = encrypted.toString(CryptoJS.enc.Utf8);
console.log(encrypted.toString());

var decrypted = CryptoJS.AES.decrypt(encrypted.toString(), pwd)
var decr_msg = decrypted.toString(CryptoJS.enc.Utf8);
console.log(decr_msg);
