
const chai = require("chai");
expect = chai.expect;
const thisPackage = require("../../");
const MonqadeResponse = thisPackage.MonqadeResponse;

describe('MonqadeResponse', ()=>{
    describe('creation', () => {
        describe('new(...)',()=>{

            it(`Should create using new([],{})`,function(){
                // documents, metaObject
                const mqResponse = new MonqadeResponse([],{});
                expect(mqResponse,'should be an instance').to.be.instanceOf( MonqadeResponse );
            });
            it(`Should create using new([])`,function(){
                // documents, metaObject
                const mqResponse = new MonqadeResponse([]);
                expect(mqResponse,'should be an instance').to.be.instanceOf( MonqadeResponse );
            });
            it(`Should expose meta data if available`,function(){
                // documents, metaObject
                const metaData = {meta:'data'};
                const mqResponse = new MonqadeResponse([],metaData);
                expect(mqResponse.meta,'meta exposed').to.deep.equal( metaData );
            });
        });
        describe('.fromResponse(serialized | MonqadeResponse)', () =>{ 
            it(`Should create using MonqadeResponse.fromResponse(MonqadeResponse)`,function(){
                // documents, metaObject
                const mqResponse = new MonqadeResponse([{test:'doc'}]);
                const mqResponseCopy =  MonqadeResponse.fromResponse(mqResponse);
                expect( mqResponseCopy,'should be an instance').to.be.instanceOf( MonqadeResponse );
                expect( mqResponseCopy.documents[0].test,' contain the same documents').to.be.equal( 'doc' );
                expect( mqResponseCopy.documents[0].test,' test premise malfunction ').to.not.be.equal( 'other' );

                mqResponseCopy.documents[0].newKey = 'new value';
                expect( mqResponse.documents[0].newKey,' it is supposed reference').to.be.equal( 'new value' );

            });
            it(`Should create using MonqadeResponse.fromResponse(serializeResponse)`,function(){
                const mqResponseCopy =  MonqadeResponse.fromResponse({_docs:[{test:'doc'}]});
                expect( mqResponseCopy,'should be an instance').to.be.instanceOf( MonqadeResponse );
                expect( mqResponseCopy.documents[0].test,' contain the same documents').to.be.equal( 'doc' );
                expect( mqResponseCopy.documents[0].test,' test premise malfunction ').to.not.be.equal( 'other' );

            });

        });
    })
    describe('serialized type testing' , () => {
        describe('.isThisOne(object)',() => {
            it('Should be able to determine if the serialized object can become an MonqadeResponse object',( )=>{
                const isOne = MonqadeResponse.isThisOne({_docs:[{test:'doc'}],isMonqadeResponse:true});
                expect(isOne).to.be.true;
            });
            it('Should be able to determine if the serialized object can not become an MonqadeResponse object',( )=>{
                const isOne = MonqadeResponse.isThisOne({_docs:[{test:'doc'}]});
                expect(isOne).to.be.false;
            })
            it('Should be able to determine if the instance is a MonqadeResponse object',( )=>{
                const mqResponse = new MonqadeResponse();
                const isOne = MonqadeResponse.isThisOne(mqResponse);
                expect(isOne).to.be.true;
            });
            it('Should be able to determine if the instance is a MonqadeResponse object',( )=>{
                const mqResponse = new Object();
                const isOne = MonqadeResponse.isThisOne(mqResponse);
                expect(isOne).to.be.false;
            });
            it('Should returned false if called with undefined arguments',( )=>{
                const mqResponse = new Object();
                const isOne = MonqadeResponse.isThisOne();
                expect(isOne).to.be.false;
            });

        });
    })

    
})

