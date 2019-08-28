require('dotenv').config()
const MoltinGateway = require('@moltin/sdk').gateway
const postmark = require('postmark')
const postmarkClient = new postmark.ServerClient(process.env.POSTMARK_ID)
const { Router } = require('express')
const errorHandler = require('../utils/errorHandler')

const router = Router()

const Moltin = MoltinGateway({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET
})

const sendEmail = async (data) => {
  const textBodyUrl = process.env.NODE_ENV === 'dev' ? `http://localhost:'${process.env.PORT}/forgotten-password/${data.token}` : `http://${process.env.WEB_ADDRESS}/forgotten-password/${data.token}`
  await postmarkClient.sendEmail({
    'From': process.env.EMAIL_ADDRESS,
    'To': data.email,
    'Subject': 'Test',
    'TextBody': `Visit ${textBodyUrl}`
  })
}

router.post('/forgotten-password', async (req, res) => {
  const email = req.body.email

  if (!email) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Email address is required.'
        }
      ]
    })
  }

  try {
    const filteredCustomer = await Moltin.Customers.Filter({
      eq: {
        email
      }
    }).All()

    if (filteredCustomer.data.length < 1) {
      return
    }

    const customer = filteredCustomer.data[0]
    const updateCustomer = await Moltin.Customers.Update(customer.id, {
      reset_token: customer.reset_token,
      reset_token_expiry: customer.reset_token_expiry
    })

    sendEmail({
      email: updateCustomer.data.email,
      token: updateCustomer.data.reset_token
    })

    return res.status(200).send(updateCustomer.data)
  } catch (err) {
    return errorHandler(res, err)
  }
})

router.post('/forgotten-password/update-password', async (req, res) => {
  const currentTime = new Date().getTime()
  const token = req.body.token
  // Find customer using reset token
  const findCustomer = await Moltin.Customers.Filter({
    eq: {
      reset_token: token
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
  const storedExpiry = customer.data.reset_token_expiry
  const storedToken = customer.data.reset_token
  const password = req.body.password
  const confirmPassword = req.body.confirm_password

  // Validate passwords
  if (!password && !confirmPassword) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Password has not been submitted'
        },
        {
          status: 401,
          detail: 'Confirm password has not been submitted'
        }
      ]
    })
  }

  if (!password) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Password has not been submitted'
        }
      ]
    })
  }

  if (!confirmPassword) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Confirm password has not been submitted'
        }
      ]
    })
  }

  if (password !== confirmPassword) {
    return errorHandler(res, {
      errors: [
        {
          status: 401,
          detail: 'Passwords do not match.'
        }
      ]
    })
  }

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
      password: req.body.password,
      reset_token_expiry: null,
      reset_token: null
    })

    return res.status(200).send(updateCustomer.data)
  } catch (err) {
    return errorHandler(res, err)
  }
})

module.exports = router
