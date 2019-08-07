
// const path = require('path');
const fs = require('fs');
const path = require('path');

function importTest(name, path,skipTest=false) {
    if(skipTest){
        describe.skip(name, function () {
            require(path);
        });
    }else {
        describe(name, function () {
            require(path);
        });
    }
}


describe("Monqade Schema Tests", function () {

    before(function () {
        console.log("\t*Set-up");

     });// end before(...)

     beforeEach(function () {
       // console.log("running something before each test");
    });

    const skipTest = true;
    importTest("lambdas", './partials/lambda.test.js',   ! skipTest) ;
    importTest("MonqadeResponse", './partials/MonqadeResponse.test.js',   ! skipTest) ;
    importTest("MonqadeError", './partials/MonqadeError.test.js',   ! skipTest) ;
    
    importTest("MonqadeResponseMany", './partials/MonqadeResponseMany.test.js',   ! skipTest) ;

    
    it.skip('Need to rewrite lambdas.js to be jsdoc friendly')
    after(function () {
        console.log("\n\t*Tear-down");

    });
});