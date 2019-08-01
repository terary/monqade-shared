
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

    // if(fs.existsSync(path.resolve('./src-internal/monqade-schema-factory/'))){
    //     importTest("Dataset Builder", './partials/DatasetBuilder.test.js',   ! skipTest) ;
    // }else{
    //     describe.skip(`Development Test only.  Dependency missing- Skipping.  See code ${__filename} for more details`, function(){
    //         importTest("Dataset Builder", './partials/DatasetBuilder.test.js',   ! skipTest) ;
    //         `Dataset builder is a helper function that build datasets for testings purpose.
    //         It utilizes MonqadeSchema, MonqadeSchemaFactory which are dependants of this package.
    //         Thus, creating a circular dependancy crisis.  To avoid the crisis test are run only in 
    //         development environment.
            
    //         To run tese tests create the above path and place in it the content so 'src' from 
    //         the  MonqadeSchemaFactory project.
            
    //         `
    //     });
    // }
    
    it.skip('Need to rewrite lambdas.js to be jsdoc friendly')
    after(function () {
        console.log("\n\t*Tear-down");

    });
});