
const schemaVersionKeyPath =  {
    isSearchable: false,
    isProjectable: false,
    isUpdatable: false,
    isInsertable: false,
    isRequired: true,
    isSystem: true,
    type: "String",
    makeTestData:()=>{},
    notes: {
      "purpose": "Track schema used to insert document, eg: schema compliancy ",
      "restriction": "match this schema schema's  schemaVersionKey "
    }
  };
  const systemPath =  {
    isSearchable: false,
    isProjectable: true,
    isUpdatable: false,
    isInsertable: false,
    isRequired: true,
    isSystem: true,
  };

  module.exports.systemPath = systemPath;
  module.exports.schemaVersionKeyPath = schemaVersionKeyPath;
