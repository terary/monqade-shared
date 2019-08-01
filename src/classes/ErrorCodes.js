/**
 * ErrorCode used within the Monqade project
 * *click code link to see error codes*
 * @module monqade-shared/ErrorCodes
 * 
 * 
 */
 const ErrorCodes = {
    CODE:"Description",
    UNKNOWN_ERROR: "Error occurred without explanation",

    NoMatchingDocumentFound: `No matching document.  Possibly _id, __v, updatedAt did not match  `,

    MissingOrInvalidSystemPaths: `Unable to perform operation without valid system fields: _id, updatedAt, sometimes __v`,
    MissingOrInvalidDocumentIDs: `Unable to perform operation without valid: _id, `,  //(findOne only requires _id and not __v, updatedAt..)
    // these are the same
    EmptyFindCriteria: `Attempted to do 'find' without filter criteria`, 
    IllegalQueryOptionDetected:`QueryBuilder or Query contained an illegal operator or no searchable path`,

    NoPayloadFound: `monqade-express, server unable to extract the payload, either doesn't exist, malformed, embedded, etc.`,

    EmptyCandidateDoc: `Document for insert/update had no values after filter isUpdate/isInsert`,

    MongooseValidationError: 'Mongoose/MongoDB threw validation error . Check original error for more detail',
    // seems insert is the only one using this - and there is nothing to determine if it's actually a validate error
    MongooseOtherError: 'Mongoose/MongoDB threw error. Check original error for more detail',
    NonTrustedQueryBuilder: 'Given query builder fails test: LAMBDAS.isTrustedQueryBuilder(queryBuilder)',
    

    MongooseError: ' Probably a validation error - See original error',
    InsertSystemPathsForbidden: 'Attempted to insert system paths.. _id, createdAt, updatedAt, schemaVerKey, docVerKey',

    // SPECIFIC TO MONQADE EXPRESS
    // These is a MonqadeExpress error - only.
    JsonParseFailure: 'Failed to parse json'


} 
module.exports  = ErrorCodes;