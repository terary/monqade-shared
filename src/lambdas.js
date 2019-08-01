
const  _ = require('lodash');

const isHex=(s)=>{
    const hexRegEx = /([0-9]|[a-f])/gim

    return typeof s === 'string' &&
        (s.match(hexRegEx) || []).length === s.length
}


// const isPojo = (obj)=>{
//     if(obj.constructor.name === 'Date'){
//         return true;
//     }else if(obj.constructor.name === 'String'){
//         return true;
//     }else if(obj.constructor.name === 'Number'){
//         return true;
//     }else if(obj.constructor.name === 'Boolean'){
//         return true;
//     }else if(obj.constructor.name === 'Array'){
//         for(val of obj ){
//             if(!isPojo(val)){
//                 console.log("not pojo:", val)
//                 return false;
//             }
//         }
//         return true;
//     }else if(obj.constructor.name === 'Object'){
//         for([k,val] of Object.entries(obj)){
//             if(!isPojo(val)){
//                 return false;
//             }
//         }
//         return true;
//     }
//     return false;
// };

const _keysDeepRecursive = (obj,keys) => {
    if(Array.isArray(obj)){
        obj.forEach(el=>{
            _keysDeepRecursive(el,keys);
        })
        return;

    }
    if(typeof obj === 'object'){
        Object.entries(obj).forEach(([key,val]) => {
            keys.push(key)
            if(typeof val === 'object'){
                _keysDeepRecursive(val,keys);

            }
        })
        return;
    }
    // keys.push(obj)  
    return keys; // pretty sure this is pointless
}

/**
 * Useful helper functions.
 * @module monqade-shared/lambdas
 */
const lambdas={

    /** deprecated */
    // rejectedPromise : function(error){
    //     return new Promise((resolve,reject) => {
    //         return reject(error)
    //     })
    // },
    /**
     * Extract all keys from a given object - recursively
     * @memberof module:monqade-shared/lambdas
     * 
     * obj = {
     *  key1:'value',
     *  key2:[{k2k1:'val'},{k2k2:'val'},'value'],
     *  key3: {
     *      k3k1: {
     *          k3k1k1:'value'
     *      },
     *      k3k2:'value',
     *      k3k3: () => {}
     *  }
     * }
     *  should return [key1,key2,key3,k2k1,k2k2,k3k1,k3k1k1,k3k2,k3k3] - No particular order
     *  minMax(0,2,3,-1)-> { min: -1, max: 3}
     * 
     *  minMax(new Date('1974-06-29'),new Date('2018-06-29')) -> { min: 141696000000, max: 1530230400000 }
     * 
     * minMax('apple','banana') -> {min: NaN, max: NaN}
     * 
     * **returns** [keys] any/all values that are used as a key
     * @param {} object - object to extract keys from. 
     * @returns {array} -  any/all values that are used as a key
     */
    keysDeep:(obj) => {
        const keys = [];
        _keysDeepRecursive(obj,keys);
        return keys
    },
    /**
     * Find min and max of values from the given values
     * @memberof module:monqade-shared/lambdas
     * @desc 
     *  minMax() -> {min: Infinity, max: -Infinity}
     *   
     *  minMax(0,2,3,-1)-> { min: -1, max: 3}
     * 
     *  minMax(new Date('1974-06-29'),new Date('2018-06-29')) -> { min: 141696000000, max: 1530230400000 }
     * 
     * minMax('apple','banana') -> {min: NaN, max: NaN}
     * 
     * **returns** {min:..., max:...}
     * @param {...any} values - any number of values 
     * @returns {object} - {min:n,max:n}
     */
    minMax : (...valuesArray)=>{
        return { min:Math.min.apply(null,valuesArray),  max:Math.max.apply(null,valuesArray) };
    },

    /**
     * Extracts key/value of a document.
     * works only on first level keys 
     * @memberof module:monqade-shared/lambdas
     * @description pathIDs not in the JSON ( or undefined) will be removed.
     * 
     * @example
     *  const subDocument = {
     *      subkey1:'subkey',
     *      subkey2:[1,2,3],
     *      subkey3:{
     *          subsubkey1:'a sub subkey',
     *          subsubkey1:[1,2,3],
     *          subsubkey1:new Date()
     *      }
     *  };
     *  const superDocument = {
     *      key1:'some key',
     *      key2:subDocument,
     *      key3:'three',
     *      key4:['a','b','c']
     *  }
     *  
     * .subDocumentOfPaths(superDocument,['key1','key3']) -> {key1:'some key',key3:'three'}
     * .subDocumentOfPaths(superDocument,['key2','key4']) -> {key2:subDocument,key4:['a','b','c']}
     * .subDocumentOfPaths(superDocument,['subkey1']) -> {}
     * .subDocumentOfPaths(superDocument,['nonKey']) -> {}
     * @param {JSON} doc - container document
     * @param {string[]} pathIDs - pathIDs to extract from the JSON, 
     * @returns {JSON} document - that contains only the paths listed in 'pathIDs' and defined in the original JSON
     */
    subDocumentOfPaths: (doc,pathIDs)=>{
        const theNewDoc = pathIDs.reduce((o, pathID) => ({ ...o, [pathID]: doc[pathID]}), {}); //doc;
        Object.keys(theNewDoc).forEach((pathID)=>{
            if(theNewDoc[pathID]===undefined){ delete theNewDoc[pathID]}
        });
        return theNewDoc;
    },

    /**
     * Create an object from the array of keys, with initial values 
     * @memberof module:monqade-shared/lambdas
     * @example
     *  .objectFromArrayOfKeys(['k1','k2','k3'],'some value') -> {
     *      k1:'some value'
     *      k2:'some value'
     *      k3:'some value'
     *  } 
     * @desc Create an object from the array of keys setting each key to initial value  
     * **returns** {key:initialValue}
     * @param {string[]} keyArray - keys to be used. 
     * @param {any} initValue - initial value 
     * @returns {object} - {key:initialValue}
     */
    objectFromArrayOfKeys:(keyArray,initValue)=>{
        // objectFromArrayOfKeys([k1,k2,k3],i) -> {k1:i,k2:i:k3:i}
        return keyArray.reduce((o, key) => ({ ...o, [key]:initValue}), {})
    },

    
    /**
     * Determine if aSubset object exists in aSueperset object  
     * @memberof module:monqade-shared/lambdas
     * @example
     * .objectIsSubset(A,B) 
     * A:{} B:{} --> true
     * A:{"a":1,"b":2} B:{"a":1,"b":2} --> true
     * A:{"a":1,"b":2} B:{"b":2} --> false
     * A:{"b":2} B:{"a":1,"b":2} --> true
     * A:{"a":1,"b":2} B:{"A":1,"B":2} --> false
     * A:{"a":1,"b":2} B:{"b":2,"a":1} --> true
     * A:{"a":1,"b":{"b1":2}} B:{"a":1,"b":{"b1":"2"}} --> false
     * A:{"a":1,"b":{"b1":"2"}} B:{"a":1,"b":{"b1":"2"}} --> true
     * A:{"a":1,"b":{"b1":"2","b2":"fish"}} B:{"a":1,"b":{"b1":"2","b2":"fish"}} --> true
     * A:{"a":1,"b":{"b2":{"b2a":"fish"},"b1":"2"}} B:{"a":1,"b":{"b1":"2","b2":{"b2a":"fish"}}} --> true
     * **returns** Boolean - true if aSubset exists aSuperset, false otherwise
     * @param {object} aSubset - subset object
     * @param {object} aSuperset - super-set object  
     * @returns {Boolean} - true if aSubset exists aSuperset, false otherwise
     */
    objectIsSubset: (aSubset, aSuperset) => (
        _.every(aSubset, (val, key) => _.isEqual(val, aSuperset[key]))
    ),
    
    /**
     * Returns array of elements that exist in A but not in B    
     * @memberof module:monqade-shared/lambdas
     * @example
     * .arrayFrom_A_minus_B([1,2,3,4],[3,4,5,6]) -> [1,2]
     * 
     * @desc Returns array of elements that exist in A but not in B.  (A-B) 
     *  
     * Only tested with simple elements.
     * 
     * **returns**  array of elements that exist in A but not in B
     *  
     * @param {object} A - array of elements
     * @param {object} B - array of elements 
     * @returns {array} 
     */
    arrayFrom_A_minus_B: (A,B)=>{
        // (A-B) elements in A but not in B
        const AminusB = [];
        for(let i of A ){
            if(B.indexOf(i)==-1){
                AminusB.push(i);
            }
        }
        return AminusB;
    },

    isLiveMongoose: (connRef)=> {
        if( !connRef || !connRef.connection )  {
            return false;
        }
        
        if(connRef.connection.readyState==1 || connRef.connection.readyState==2 ){
            return true;
        }
        return false;
    },
    /**
     * //deprecated do no use.
     * use: mongoose.Types.ObjectId.isValid instead
     * 
     * Test the 'ID' to assure it looks like it could be a mongoDB ID    
     * @memberof module:monqade-shared/lambdas
     * @desc Test the 'ID' to assure it looks like it could be a mongoDB ID 
     * 
     * **returns**  true if 'ID' is 24 characters  and hex.
     *  
     * @param {String} ID - string that to test if it looks like mongoDB id
     * @returns {Boolean} 
     */
    // isValidMongoID:(ID)=>{ //deprecated do no use.
    //     if(!ID) {return false;}
    //     return ID.length==24 && isHex(ID);
    // },

    isHex:isHex,
    //isPojo :isPojo,  //deprecated do no use.

    
    /**
     * Determine if thingy is an object  
     * @memberof module:monqade-shared/lambdas
     * @example
     * .isObject(number) -> false;    
     * .isObject(array) -> false; //natively array is an object    
     * .isObject(string) -> false;    
     * .isObject(date) -> false;    
     * .isObject(undef) -> false;    
     * .isObject(null) -> false;    
     * .isObject({}) -> true;    
     * **returns** Boolean - true if thingy is an real object
     * @param {object} thingy - test subject
     * @returns {Boolean} - true if aSubset exists aSuperset, false otherwise
     */
    isObject: (thingy)=>{
        // .isObject(number) -> false;    
        // .isObject(array) -> false; //natively array is an object    
        // .isObject(string) -> false;    
        // .isObject(date) -> false;    
        // .isObject(undef) -> false;    
        // .isObject(null) -> false;    
        // .isObject({}) -> true;    
    
        return typeof thingy === 'object' && thingy !== null && !Array.isArray(thingy);
    },



};



module.exports = lambdas;