"use strict";

const MonqadeResponse = require('./MonqadeResponse');

class MonqadeResponseMany extends MonqadeResponse {
    constructor(docs,appliedQuery,meta){
        super(docs,meta);
        this._appliedQuery = appliedQuery || "redacted";
    }
    get appliedQuery(){
        return this._appliedQuery;
    }
    static isThisOne(obj){
        if(obj && obj.constructor.name == 'MonqadeResponseMany' ){
            return true;
        }
        return false;
    }
    static fromResponse(r){
        // to trick-out codeAssist 
        return new MonqadeResponseMany(r._docs,r.appliedQuery, r._meta);
    }
}

// module.exports = {MonqadeResponseDO:MonqadeResponse,MonqadeResponse:MonqadeResponse, MonqadeResponseSearch:MonqadeResponseSearch};
module.exports = MonqadeResponseMany;
