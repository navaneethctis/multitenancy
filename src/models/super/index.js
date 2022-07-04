const Mongoose = require('mongoose')

const tenantSchema = require('./tenant')

const {CONNECTION_STRING} = process.env

const superConnection = Mongoose.createConnection(
  CONNECTION_STRING.replace('<databaseName>', 'super')
)

const Tenant = superConnection.model('Tenant', tenantSchema)

module.exports = {
  Tenant,
  connection: superConnection
}
