
const chai = require("chai");
expect = chai.expect;
const thisPackage = require("../../");
const MonqadeResponseMany = thisPackage.MonqadeResponseMany;

describe('MonqadeResponseMany', ()=>{
    describe('creation', () => {
        describe('new(...)',()=>{

            it(`Should create using new([docs],"appliedQuery",{meta})`,function(){
                // documents, metaObject
                const mqResponse = new MonqadeResponseMany([], "", {});
                expect(mqResponse,'should be an instance').to.be.instanceOf( MonqadeResponseMany );
            });

            it(`Should create using new([])`,function(){
                // documents, metaObject
                const mqResponse = new MonqadeResponseMany([]);
                expect(mqResponse,'should be an instance').to.be.instanceOf( MonqadeResponseMany );
            });
            it(`Should be a subclass of 'MonqadeResponse' `,function(){
                expect(thisPackage.MonqadeResponse.isPrototypeOf(MonqadeResponseMany)).to.be.true;
            });

        });
        describe('MonqadeResponseMany.fromResponse', () => {
            it(`Should create using MonqadeResponse.fromResponse(MonqadeResponse)`,function(){
                // documents, metaObject
                const mqResponse = new MonqadeResponseMany([{test:'doc'}]);

                const mqResponseCopy =  MonqadeResponseMany.fromResponse(JSON.stringify(mqResponse));
                expect( mqResponseCopy,'should be an instance').to.be.instanceOf( MonqadeResponseMany );
            });


        });
        describe('.appliedQuery', () => {
            it(`Should be set to 'redacted' as default value `,function(){
                const mqResponse = new MonqadeResponseMany([]);
                expect(mqResponse.appliedQuery,'should be an instance').to.equal( "redacted" );
            });
            it(`Need to build switch/option disable applied query`)

        })
    })

    
})

