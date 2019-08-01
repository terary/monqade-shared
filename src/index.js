
/**
* @module monqade-shared
* @desc modules, classes, functions commonly used across all monqade
*/

module.exports.LAMBDAS=require('./lambdas');;
module.exports.MonqadeError = require('./classes/MonqadeError');
module.exports.MonqadeErrorCodes = require('./classes/ErrorCodes');
module.exports.MonqadeResponse = require('./classes/MonqadeResponse');

module.exports.MonqadeResponseMany =require('./classes/MonqadeResponseMany');
module.exports.schemaVersionKeyPathTemplate =require('./defaults/pathTemplates').schemaVersionKeyPath;
module.exports.systemPathTemplate =require('./defaults/pathTemplates').systemPath;
module.exports.MonqadeResponseSearch =require('./classes/MonqadeResponseSearch');


