const { Router } = require('express')
const moltinServices = require('./moltinServices.js')
const forgottenPassword = require('./forgottenPassword.js')
const router = Router()

router.use(moltinServices, forgottenPassword)

module.exports = router
