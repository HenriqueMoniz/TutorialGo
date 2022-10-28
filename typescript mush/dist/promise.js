"use strict";
var testInt = 10;
const promise = new Promise((resolve, reject) => {
    if (testInt > 15) {
        resolve("Está certo");
    }
    reject("Não quero");
});
promise.then((result) => {
    var x = result;
    console.log("resultado: " + result);
}, (rejected) => {
    console.log("resultado: " + rejected);
});
