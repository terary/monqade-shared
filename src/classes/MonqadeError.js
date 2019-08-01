"use strict";
/**
 * Useful helper functions.
 * @module monqade-shared/MonqadeError
 */

/**
 * Monqade Common Error
 * 
 * @class MonqadeError
 * @description Subclass of Error.  
 * Extends standard Error with Monqade's ErrorCodes. see {ErrorCodes} 
 * 
 * 
 * @param {string} code - specific code from {ErrorCodes}
 * @param {string} description - description of the specific error will override default description from ErrorCodes
 * @param {object|string} originalError - The original captured error - if available
 */
const ErrorCodes = require('./ErrorCodes');
 class MonqadeError extends Error {
    // 'code' should be defined in  ErrorCodes.
    //  essentially the same thing as Error.name except it expands an meaning and resolution.
    //     
    constructor(code,description,originalError){
        super(description);
        // this.message = description;
        this.name = code;
        this._code =code;
        this._description = description || ErrorCodes[code];
        this._originalError = originalError;
        this.isMonqadeError = true; // serialize friendly  

        // if (Error.captureStackTrace) {
        //     Error.captureStackTrace(this, MonqadeError);
        //   }

    }
    /**
     * Monqade ErrorCode 
     * 
     * Specific code indicating the error.
     * 
     * **returns** ErrorCode  
     * @return {ErrorCode}   
     */
    get code(){
        return this._code;
    }
    /**
     * Description of the Error
     * 
     * This may be more descriptive than the generic error description indicated in ErrorCodes
     * 
     * **returns** string  
     * @return {string}   
     */
    get description(){
        return this._description;
    }

    /**
     * Original Error if available
     * 
     * Suitable for debugging 
     * 
     * **returns** Any other additional information if available.   
     * @return {object}   
     */
    get originalError(){
        return this._originalError;
    }
    /**
     * Helper to determine if a given object is MonqadeError
     * 
     * **done**
     * 
     * @desc 
     * 
     * 
     * **returns** true given object is a MonqadeError
     * @return {boolean}   
     */
    static isThisOne(obj){
        if(!obj) {
            return false;
        }
        return !! obj.isMonqadeError;
    }

    /**
     * Helper to convert given error response to a known MonqadeResponse
     * 
     * **done**
     * 
     * @desc - useful for tricking-out code assist
     * 
     * 
     * **returns**  MonqadeError representing the given object
     * @return {MonqadeError}   
     */
    static fromError(e){
        // to trick-out codeAssist 
        return new MonqadeError(e._code,e._description,e._originalError);
    }
}

module.exports =MonqadeError;