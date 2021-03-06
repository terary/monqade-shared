
const chai = require("chai");
expect = chai.expect;
const thisPackage = require("../../");
const LAMBDAS = thisPackage.LAMBDAS;
const MonqadeError = require('../../src/classes/MonqadeError');
const MonqadeResponse = require('../../src/classes/MonqadeResponse');

describe(`isHex()`, () => {

    it(`Should return false when called with non hex .isHex('bad hex')  `,function(){
        expect(LAMBDAS.isHex('bad hex'),`'bad hex' should return false `).to.be.false;
    });
    it(`Should return false when called without argument  `,function(){
        expect(LAMBDAS.isHex(),`'bad hex' should return false `).to.be.false;
    });
    it(`Should return false when called without argument  `,function(){
        expect(LAMBDAS.isHex(1),`'bad hex' should return false `).to.be.false;
    });

    it(`should return true when called with chars: 0-9A-F .isHex('0123456789ABCDEF')  `,function(){
        expect(LAMBDAS.isHex('0123456789ABCDEF'),`'0123456789ABCDEF' should return true `).to.be.true;
    })
});

it(`.minMax(3,'-3','2',4,) should deep equal {min:-3,max:4}`,function (){ 
    expect(LAMBDAS.minMax(3,'-3','2',4,),`'.minMax(3,'-3','2',4,)' should deep equal `).to.deep.equal({min:-3,max:4});
}); 

it(`.objectFromArrayOfKeys(['one','two','three'],-3) should deep equal {one:-3,two:-3,three:-3}`,function (){ 
    expect(LAMBDAS.objectFromArrayOfKeys(['one','two','three'],-3),'mess'  ).to.deep.equal({one:-3,two:-3,three:-3})
});

it(`.arrayFrom_A_minus_B([1,2,3,4,5],[4,5,6,7]) should deep equal [1,2,3]`,function (){ 
    // Math A-B --> elements in A and not in B
    expect(LAMBDAS.arrayFrom_A_minus_B([1,2,3,4,5],[4,5,6,7]),'should equal [4,5]'  ).to.deep.equal([1,2,3])
});
// it('.isValidMongoID check if 24 characters and is hex',function (){ 
//     expect(LAMBDAS.isValidMongoID('5c294777b2caa15b6f9f2f3b'),'5c294777b2caa15b6f9f2f3b 24 characters and is hex').to.be.true;    
//     expect(LAMBDAS.isValidMongoID('5c294777b2caa15b6f9f2f3b1'),'5c294777b2caa15b6f9f2f3b1 25 characters').to.be.false;    
//     expect(LAMBDAS.isValidMongoID('5c294777b2caa15b6f9f2f3x'),'5c294777b2caa15b6f9f2f3x  x not valid hex').to.be.false;    
// })
it(`.isObject -> false for: [], '', 1, Date(), undef, null.  true for {}  `,function (){ 
    const number = 3, array = [], object = {}, string = "my string";
    const date = Date(), undef = undefined, NULL = null;

    expect(LAMBDAS.isObject(number),'.isObject(number) number not an object').to.be.false;    
    expect(LAMBDAS.isObject(array),'.isObject(array) array not an object').to.be.false;    
    expect(LAMBDAS.isObject(string),'.isObject(string) string not an object').to.be.false;    
    expect(LAMBDAS.isObject(date),'.isObject(date) date not an object').to.be.false;    
    expect(LAMBDAS.isObject(undef),'.isObject(undef) undef not an object').to.be.false;    
    expect(LAMBDAS.isObject(NULL),'.isObject(NULL) NULL not an object').to.be.false;    
    expect(LAMBDAS.isObject(object),'.isObject(object) object not an object').to.be.true;    

})
it('.subDocumentOfPaths',function (){ 
    const subDocument = {
        subkey1:'subkey',
        subkey2:[1,2,3],
        subkey3:{
            subsubkey1:'a sub subkey',
            subsubkey1:[1,2,3],
            subsubkey1:new Date()
        }
    };
    const superDocument = {
        key1:'some key',
        key2:subDocument,
        key3:'three',
        key4:['a','b','c']
    }
    expect(LAMBDAS.subDocumentOfPaths(superDocument,['key1','key3']),' simple').to.deep.equal({key1:'some key',key3:'three'})
    expect(LAMBDAS.subDocumentOfPaths(superDocument,['key2','key4']),' not so simple').to.deep.equal({key2:subDocument,key4:['a','b','c']});
    expect(LAMBDAS.subDocumentOfPaths(undefined,['key2','key4']),' not so simple').to.deep.equal({});
})

it.skip('.rejectedPromise  - deprecated.  Shouldn\'t be in use but in case it is left in the module',function (){ })
it('.isLiveMongoose - should return false for undefined mongoose ref', () => {
    `Test are to satisfy coverage reports`;
    expect(LAMBDAS.isLiveMongoose(undefined)).to.be.false;
 
});
it('.isLiveMongoose - should return true for readyState = 2', () => {
    `Test are to satisfy coverage reports`;
    const connRef = {connection:{readyState:2}}    
    expect(LAMBDAS.isLiveMongoose(connRef)).to.be.true;
 
});
it('.isLiveMongoose - should return true for readyState = 2', () => {
    `Test are to satisfy coverage reports`;
    const connRef = {connection:{readyState:1}}    
    expect(LAMBDAS.isLiveMongoose(connRef)).to.be.true;
 
});
it('.isLiveMongoose - should return false for readyState = 4', () => {
    `Test are to satisfy coverage reports`;
    const connRef = {connection:{readyState:4}}    
    expect(LAMBDAS.isLiveMongoose(connRef)).to.be.false;
 
});



describe('.keysDeep(object)', () => {
    let obj

    beforeEach( () => {
        obj = {
            key1:'value',
            key2:[{k2k1:'val'},{k2k2:'val'},'value'],
            key3: {
                k3k1: {
                    k3k1k1:'value'
                },
                
                k3k2:'value',
                k3k3: () => {},
                k3k4UndefinedValue:undefined,
                k3k5FalseValue: false,
                k3k6NulValue: null
            }
           }
    
    })
    it('Should return an array  ', () => {
        const keys= LAMBDAS.keysDeep(obj)
        expect(Array.isArray(keys)).to.be.true;
    });
    it('Should return an array of known keys ', () => {
        const keys= LAMBDAS.keysDeep(obj);
        const expectedKeys = ['key1','key2','key3','k2k1','k2k2','k3k1','k3k1k1','k3k2','k3k3'];
        expectedKeys.push('k3k4UndefinedValue');
        expectedKeys.push('k3k5FalseValue');
        expectedKeys.push('k3k6NulValue');
        //k3k4UndefinedValue, k3k5FalseValue, k3k6NulValue

        expect(keys.length).to.be.greaterThan(0);  // make sure we're testing something
        expect(expectedKeys.sort().join(',')).to.equal(keys.sort().join(','));
        expect(expectedKeys.length).to.equal(keys.length);

    });
    it('Should nested keys non-unique.  eg: list of keys may have duplicates ', () => {
        obj['key3']['k2k1'] ='value';
        const keys= LAMBDAS.keysDeep(obj);
        const expectedKeys = ['key1','key2','key3','k2k1','k2k2','k3k1','k3k1k1','k3k2','k3k3'];
        expectedKeys.push('k3k4UndefinedValue');
        expectedKeys.push('k3k5FalseValue');
        expectedKeys.push('k3k6NulValue');
        //k3k4UndefinedValue, k3k5FalseValue, k3k6NulValue
        expectedKeys.push('k2k1');

        expect(keys.length).to.be.greaterThan(0);  // make sure we're testing something
        expect(expectedKeys.sort().join(',')).to.equal(keys.sort().join(','));
        expect(expectedKeys.length).to.equal(keys.length);

    });
    it('Should should return empty array if called with undefined ', () => {
        const keys= LAMBDAS.keysDeep();

        expect(Array.isArray(keys)).to.be.true;
        expect(keys.length).to.be.equal(0);  // make sure we're testing something
    });
    it('Should should return empty array if called with string value ', () => {
        const keys= LAMBDAS.keysDeep('not an thing');

        expect(Array.isArray(keys)).to.be.true;
        expect(keys.length).to.be.equal(0);  // make sure we're testing something
    });
    it('Should should return empty array if called function ', () => {
        const keys= LAMBDAS.keysDeep(() => {});

        expect(Array.isArray(keys)).to.be.true;
        expect(keys.length).to.be.equal(0);  // make sure we're testing something
    });
    it('Should return as expected if called with an array of object ', () => {
        obj['key3']['k2k1'] ='value';
        const keys= LAMBDAS.keysDeep([{k1:'v'} , {k2:'v'} ]);
        const expectedKeys = ['k1','k2'];

        expect(keys.length).to.be.greaterThan(0);  // make sure we're testing something
        expect(expectedKeys.sort().join(',')).to.equal(keys.sort().join(','));
        expect(expectedKeys.length).to.equal(keys.length);

    });
    
    it('Should key if value is undefined/false/null ', () => {
        // k3k4UndefinedValue:undefined,
        // k3k5FalseValue: false,
        // k3k6NulValue: null
        const keys= LAMBDAS.keysDeep(obj);

        

        expect(keys.indexOf('k3k4UndefinedValue'), 'k3k4UndefinedValue').to.greaterThan(-1);
        expect(keys.indexOf('k3k5FalseValue'), 'k3k5FalseValue').to.greaterThan(-1);
        expect(keys.indexOf('k3k6NulValue'), 'k3k6NulValue').to.greaterThan(-1);

    });


})

describe('objectIsSubset',function(){
    const objA = {one:1,arry:['1',2,3],three:{big:'apple'}};
    const objB = {one:1,arry:['1',2,3],three:{big:'apple'},name:'john'}
    const objC = {one:1,arry:['1',2,3],three:{big:'apple'}};

    it('Expect .objectIsSubset(objA,objB) to be true',function (){ 
        expect(LAMBDAS.objectIsSubset(objA,objB),``).to.be.true;
    })
    it('Expect .objectIsSubset(objB,objA) to be false',function (){ 
        expect(LAMBDAS.objectIsSubset(objB,objA),``).to.be.false;
    })
    it('Expect .objectIsSubset(objA,objC) to be true',function (){ 
        expect(LAMBDAS.objectIsSubset(objA,objC),``).to.be.true;
    })
    it('Expect .objectIsSubset(objC, objA) to be true',function (){ 
        expect(LAMBDAS.objectIsSubset(objA,objC),``).to.be.true;
    })
    // probably could have thrown in some deep equal - but really just want to demonstrate.


})

describe('datasetCreator', ()=>{
    it('should have member function build',()=>{
        expect(LAMBDAS.datasetCreator.build).to.not.be.undefined;
    })
    describe('.build(<MonqadeSchema>,<count>) returns a promise', ()=> {
        it('Should be a promise that resolves if all goes well',()=>{
            const someFunction = ()=>{};
            const pseudoMonqadeResponse = {_docs:[{}]}
            const insertSuccess = ()=>{return Promise.resolve(pseudoMonqadeResponse)}; //
            const pseudoSchema = {createTestDocumentForInsert: someFunction, doInsertOne: insertSuccess};
            expect(LAMBDAS.datasetCreator.build(pseudoSchema,3)).to.be.a('Promise');
        })
    
        it('Should resolve with an array of documents length specified - if all goes well',(done)=>{
            const documentBuildCount =3;
            const someFunction = ()=>{};
            const pseudoMonqadeResponse = {_docs:[{}]}
            const insertSuccess = ()=>{return Promise.resolve(pseudoMonqadeResponse)}; //
            const pseudoSchema = {createTestDocumentForInsert: someFunction, doInsertOne: insertSuccess};
            LAMBDAS.datasetCreator.build(pseudoSchema,documentBuildCount).then(docs=>{
                expect(docs.length).to.equal(documentBuildCount);
                done();
            }).catch(e=>{
                expect(e).to.be.null;                
                done();
            })
            // expect(LAMBDAS.datasetCreator.build(pseudoSchema,3)).to.be.a('Promise');
        })
        it('Should reject with MonadeError, if MonqadeError is thrown',(done)=>{
            const someFunction = ()=>{};
            const insertFailed = ()=>{return Promise.reject(new MonqadeError('UNKNOWN_ERROR'))}; //
            const pseudoSchema = {createTestDocumentForInsert: someFunction, doInsertOne: insertFailed};
            LAMBDAS.datasetCreator.build(pseudoSchema,3).then(docs=>{
                expect(docs).to.be.null;                
                done();
            }).catch(e=>{
                expect(e).to.not.be.null;
                expect(e.isMonqadeError).to.be.true;
                done();
            })
          
            // expect(LAMBDAS.datasetCreator.build(pseudoSchema,3)).to.be.a('Promise');
        })
        it('Should reject with non MonadeError, if other error',(done)=>{
            LAMBDAS.datasetCreator.build(undefined,3).then(docs=>{
                expect(docs).to.be.null;                
                done();
            }).catch(e=>{
                expect(e).to.not.be.null;
                expect(e.isMonqadeError).to.not.be.true;
                done()
            })
          
            // expect(LAMBDAS.datasetCreator.build(pseudoSchema,3)).to.be.a('Promise');
        })
    })

})
