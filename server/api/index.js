const { Router } = require('express')
const moltin = require('./moltin.js')
const forgottenPassword = require('./forgottenPassword.js')
const router = Router()

router.use(moltin, forgottenPassword)

module.exports = router
