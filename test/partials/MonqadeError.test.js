
const chai = require("chai");
expect = chai.expect;
const thisPackage = require("../../");
const MonqadeError = thisPackage.MonqadeError;
const MqErrorCodes = thisPackage.MonqadeErrorCodes;
// module.exports.MonqadeErrorCodes = require('./classes/ErrorCodes');
describe('MonqadeError', ()=>{
    describe('creation', () => {
        describe('new(...)',()=>{

            it(`Should create using new('theCode','description',{original: 'error'})`,function(){
                // documents, metaObject
                const mqError = new MonqadeError('theCode','description',{original: 'error'});
                expect(mqError,'should be an instance').to.be.instanceOf( MonqadeError );
            });
            it(`Should use the ErrorCode.description if no description is supplied`, ()=>{
                const mqError = new MonqadeError('NoMatchingDocumentFound',undefined,{original: 'error'});
                
                expect(mqError.description,'should be an instance').to.equal(MqErrorCodes['NoMatchingDocumentFound'] );

            })
        });
        describe('.fromError(serialized | MonqadeError)', () =>{ 
            it(`Should create using MonqadeError.fromError(MonqadeError)`,function(){
                // documents, metaObject
                const mqError = new MonqadeError('theCode','description',{original:'error'});
                const mqErrorCopy =  MonqadeError.fromError(mqError);
                expect( mqErrorCopy,'should be an instance').to.be.instanceOf( MonqadeError );

                expect( mqErrorCopy.originalError,'should be the original error').to.deep.equal( {original:'error'} );
                expect( mqErrorCopy.code,' contain the same documents').to.be.equal( 'theCode' );
                expect( mqErrorCopy.code,' test premise malfunction ').to.not.be.equal( 'other' );
            });
            it(`Should create using MonqadeError.fromError(serializeResponse)`,function(){
           //         return new MonqadeError(e._code,e._description,e._originalError);

                const serializedError  = {
                        _code:'theCode',
                        _description:'The description',
                        _originalError:{
                            'otherError':'information'
                        },
                        isMonqadeError:true 
                    };
                const mqErrorCopy =  MonqadeError.fromError(serializedError);
                expect( mqErrorCopy, 'should be an instance').to.be.instanceOf( MonqadeError );
                expect( mqErrorCopy.code,' code ').to.be.equal( 'theCode' );
                expect( mqErrorCopy.description,' description  ').to.be.equal( 'The description' );

            });

        });
    })
    describe('serialized type testing' , () => {
        describe('.isThisOne(object)',() => {
            let serializedError;
            beforeEach( () => {
                serializedError  = {
                    _code:'theCode',
                    _description:'The description',
                    _originalError:{
                        'otherError':'information'
                    },
                    isMonqadeError:true 
                };

            })
            it('Should be able to determine if the serialized object can become an MonqadeError object',( )=>{

                const isOne = MonqadeError.isThisOne(serializedError);
                expect(isOne,' .isOne should be true').to.be.true;
            });
            it('Should be able to determine if the serialized object can not become an MonqadeError object',( )=>{
                const isOne = MonqadeError.isThisOne({thisIS:'not an monqadeError'});
                expect(isOne).to.be.false;
            })
            it('Should be able to determine if the instance is a MonqadeError object',( )=>{
                const mqError = new MonqadeError();
                const isOne = MonqadeError.isThisOne(mqError);
                expect(isOne).to.be.true;
            });
            it('Should be able to determine if the instance is a MonqadeError object',( )=>{
                const mqError = new Object();
                const isOne = MonqadeError.isThisOne(mqError);
                expect(isOne).to.be.false;
            });
            it('Should test for isMonqadeError property',( )=>{
                // return !! obj.isMonqadeError;
                const isOne = MonqadeError.isThisOne();
                expect(isOne).to.be.false;
            });

            

        });
    })

    
})

