
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
        describe('MonqadeResponseMany.isThisOne', () => {
            it(`should return false if called with undefined arguments `, () => {
                //const mqResponse = new MonqadeResponseMany([{test:'doc'}]);
                const isOne =  MonqadeResponseMany.isThisOne() ;
                expect( isOne,'undefined is not a MonqadeResponseMany').to.be.false;
            })
            it(`should return false if called with undefined arguments `, () => {
                const mqResponse = new MonqadeResponseMany([{test:'doc'}]);
                const isOne =  MonqadeResponseMany.isThisOne(mqResponse) ;
                expect( isOne,'MonqadeResponseMany is not a MonqadeResponseMany').to.be.true;

            })
            it(`should return false if called with undefined arguments `, () => {
                const mqResponse = Object.create({});
                const isOne =  MonqadeResponseMany.isThisOne(mqResponse) ;
                expect( isOne,'Other objects are not a MonqadeResponseMany').to.be.false;

            })


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

