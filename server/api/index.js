const { Router } = require('express')
const moltinServices = require('./moltinServices.js')
const confirmAccount = require('./confirmAccount.js')
const forgottenPassword = require('./forgottenPassword.js')
const router = Router()

router.use(
  moltinServices,
  confirmAccount,
  forgottenPassword
)

module.exports = router
