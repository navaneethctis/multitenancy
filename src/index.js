const Express = require('express')

const {Tenant} = require('./models/super')
const {getModel} = require('./models/tenant')

const {PORT} = process.env

const express = Express()
express.use(Express.json())
express.use(
  Express.urlencoded({
    extended: true
  })
)

express.get('/tenants', async (request, response) => {
  try {
    const tenants = await Tenant.find()

    response.json({tenants})
  } catch (error) {
    response.status(500).send(error.message)
  }
})

express.post('/tenants', async (request, response) => {
  try {
    const {
      body: {username}
    } = request

    if (!username) response.sendStatus(400)

    const data = {
      username: username.trim()
    }

    const tenant = await Tenant.create(data)

    const Username = getModel('Username', tenant.id)
    await Username.create(data)

    response.status(201).json({tenant})
  } catch (error) {
    response.status(500).send(error.message)
  }
})

express.get(
  '/tenants/:tenantId/usernames',
  (request, response, next) => {
    const {
      params: {tenantId}
    } = request

    request.models = {
      Username: getModel('Username', tenantId)
    }

    next()
  },
  async (request, response) => {
    try {
      const {
        models: {Username}
      } = request

      const usernames = await Username.find()

      response.json({usernames})
    } catch (error) {
      response.status(500).send(error.message)
    }
  }
)

express.listen(PORT)
