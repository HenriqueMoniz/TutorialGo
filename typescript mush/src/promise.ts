

var testInt: number = 10;

const promise = new Promise((resolve, reject) => {
    if (testInt > 15) {
        resolve("Está certo")
    }

    reject("Não quero")
/**
 * 
 * 
 * 
 */
}
);

promise.then((result) => {
    var x = result;
    console.log("resultado: " + result)
}, (rejected) => {
    console.log("resultado: " + rejected)
}
);

//outro exemplo de promisse,

/*
const promiseA = new Promise((resolutionFunc, _rejectionFunc) => {
    resolutionFunc(777);
  });
  // At this point, "promiseA" is already settled. 
  // Quando se faz isto o "then" é adiado por 10ms, portanto o print é dado após o log a seguir 
  promiseA.then((val) => console.log("asynchronous logging has val:", val));
  console.log("immediate logging");

  // immediate logging
  // asynchronous logging has val: 777
  */