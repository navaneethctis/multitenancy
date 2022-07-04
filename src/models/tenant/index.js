const Mongoose = require('mongoose')

const usernameSchema = require('./username')

const {CONNECTION_STRING} = process.env

const schemas = {usernameSchema}

const getModel = (modelName, tenantId) => {
  const tenantConnection = Mongoose.createConnection(
    CONNECTION_STRING.replace('<databaseName>', tenantId)
  )

  const schemaName = `${modelName[0].toLowerCase()}${modelName.slice(1)}Schema`
  return tenantConnection.model(modelName, schemas[schemaName])
}

module.exports = {getModel}
