"use strict";
/**
 * Useful helper functions.
 * @module monqade-shared/MonqadeResponse
 */

 

/**
 * Monqade Common Response
 * 
 * @class MonqadeResponse
 * @description Generic Response type.  
 * Most Monqade interactions will have a response of MonqadeResponse or subclass.
 * 
 * Interaction being method execution, service call, function call, etc.
 *  doUpdateOne, doInsertOne, ..., etc
 * 
 * @param {object[]} documents - result documents of a given interaction
 * @param {object} metaObject - can be anything determined by the interaction.
 */
class MonqadeResponse{
    /*
        meta - mostly a debug flexibility.          sub-classing should be used for extending properties.
    */

    constructor(documents, metaObject ){
        this._docs = documents; // should always be an array - never single record.
        this._meta = metaObject;
        this.isMonqadeResponse = true;  // serialize friendly 
    }

    /**
     * Additional information about interaction.
     * 
     * **done**
     * 
     * **returns** Any other additional information 
     * @return {object}   
     */
    get meta(){
        return this._meta;
    }

    /**
     * Documents return from Monqade interaction
     * 
     * **done**
     * 
     * @desc 
     * 
     * 
     * **returns** documents returned from Monqade interaction
     * @return {object[]}   
     */
    get documents(){
        return this._docs;
    }
    /**
     * Helper to determine if a given object is MonqadeResponse
     * 
     * **done**
     * 
     * @desc 
     * 
     * 
     * **returns** true given object is a MonqadeResponse
     * @return {boolean}   
     */
    static isThisOne(obj){
        if(!obj) {
            return false;
        }
        if(obj.constructor.name == 'MonqadeResponse' ){
            return true;
        }
        return !! obj.isMonqadeResponse;
    }

    /**
     * Helper to convert given response to a known MonqadeResponse
     * 
     * **done**
     * 
     * @desc - useful for tricking-out code assist
     * 
     * 
     * **returns**  MonqadeResponse representing the given object
     * @return {MonqadeResponse}   
     */
    static fromResponse(r){
        // to trick-out codeAssist 
        return new MonqadeResponse(r._docs, r._meta);
    }
}

//module.exports = {MonqadeResponseDO:MonqadeResponse,MonqadeResponse:MonqadeResponse, MonqadeResponseSearch:MonqadeResponseSearch};
module.exports = MonqadeResponse;
