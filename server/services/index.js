const { Router } = require('express')
const commercelayer = require('./CommerceLayerApi')
const forgottenPassword = require('./ForgottenPasswordApi')
const router = Router()

router.use(commercelayer, forgottenPassword)

module.exports = router
