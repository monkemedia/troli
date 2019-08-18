import { gateway as MoltinGateway } from '@moltin/sdk'
import axios from 'axios'

const Moltin = MoltinGateway({
  client_id: process.env.CLIENT_ID
})

const errorHandler = (err) => {
  return err.errors[0]
}

const API_URL = 'api/v1'

const $moltin = {
  async createCustomer (customer) {
    try {
      const response = await Moltin.Customers.Create(customer)
      return response
    } catch (err) {
      errorHandler(err)
    }
  },

  async customerToken (credentials) {
    try {
      const response = await axios.post(`${API_URL}/sign-in`, credentials)
      return response
    } catch (err) {
      errorHandler(err)
    }
  },

  async getCustomer (customerId) {
    try {
      const response = await axios.post(`${API_URL}/get-customer`, {
        customer_id: customerId
      })
      return response
    } catch (err) {
      errorHandler(err)
    }
  }
}

export default function (context, inject) {
  inject('moltin', $moltin)
}
