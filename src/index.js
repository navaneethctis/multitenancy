const Express = require('express')

const {Tenant} = require('./models/super')
const {getModel} = require('./models/tenant')

const {PORT} = process.env

const express = Express()
express.use(Express.json())
express.use(Express.urlencoded({extended: true}))

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
    const {body} = request

    if (!body.username) response.sendStatus(400)

    const data = {
      username: body.username.trim()
    }

    const tenant = await Tenant.create(data)

    const Username = getModel('Username', tenant.id)
    await Username.create(data)

    response.status(201).json({tenant})
  } catch (error) {
    response.status(500).send(error.message)
  }
})

express.listen(PORT)
