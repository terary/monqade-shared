// "use strict";
// const MonqadeResponse = require('./MonqadeResponse');
// class MonqadeResponseSearch extends MonqadeResponse {
//     constructor(docs,appliedQuery,meta){
//         super(docs,meta);
//         this._appliedQuery = appliedQuery;
//     }
//     get appliedQuery(){
//         return this._appliedQuery;
//     }
//     static isThisOne(obj){
//         if(obj && obj.constructor.name == 'MonqadeResponseSearch' ){
//             return true;
//         }
//         return false;
//     }
//     static fromResponse(r){
//         // to trick-out codeAssist 
//         return new MonqadeResponse(r._docs,r.appliedQuery, r._meta);
//     }
// }
// module.exports = {MonqadeResponseDO:MonqadeResponse,MonqadeResponse:MonqadeResponse, MonqadeResponseSearch:MonqadeResponseSearch};

// deprecated - renamed to 'MonqadeResponseMany' here for backwards compatibility only.
module.exports = require('./MonqadeResponseMany');
