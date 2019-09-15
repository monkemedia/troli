require('dotenv').config()
const { Router } = require('express')
const Moltin = require('../utils/moltinGateway')
const errorHandler = require('../utils/errorHandler')
const tokenGen = require('../utils/tokenGenerator')
const emailTemplate = require('../utils/emailTemplate')

const router = Router()

router.post('/confirm-account', async (req, res) => {
  const currentTime = new Date().getTime()
  const token = req.body.token
  // Find customer using reset token
  const findCustomer = await Moltin.Customers.Filter({
    eq: {
      confirm_account_token: token
    }
  }).All()
  const customerId = findCustomer.data[0].id

  if (!customerId) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Customer not found.'
        }
      ]
    })
  }

  const customer = await Moltin.Customers.Get(customerId)
  const storedExpiry = customer.data.confirm_account_expiry
  const storedToken = customer.data.confirm_account_token

  if (storedExpiry <= currentTime) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Token has expired.'
        }
      ]
    })
  }

  if (storedToken !== token) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Token is invalid.'
        }
      ]
    })
  }

  try {
    const updateCustomer = await Moltin.Customers.Update(customerId, {
      confirm_account_token: null,
      confirm_account_expiry: null,
      account_confirmed: true
    })

    return res.status(200).send(updateCustomer.data)
  } catch (err) {
    return errorHandler(res, err)
  }
})

router.post('/resend-confirmation-link', async (req, res) => {
  const email = req.body.email
  // Find customer using reset token
  const findCustomer = await Moltin.Customers.Filter({
    eq: {
      email
    }
  }).All()
  const customerId = findCustomer.data[0].id

  if (!customerId) {
    // We don't want to tell customer whether email exists or not,
    // so during error we tell them its successful
    return res.status(200).send()
  }

  try {
    const token = tokenGen.generateToken()
    const expiryToken = tokenGen.generateExpiryToken()
    const updateCustomer = await Moltin.Customers.Update(customerId, {
      confirm_account_token: token,
      confirm_account_expiry: expiryToken
    })

    await emailTemplate.confirmAccount({
      email,
      token
    })

    return res.status(200).send(updateCustomer.data)
  } catch (err) {
    return errorHandler(res, err)
  }
})

module.exports = router
