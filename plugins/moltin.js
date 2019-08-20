import { gateway as MoltinGateway } from '@moltin/sdk'
import axios from 'axios'

const Moltin = MoltinGateway({
  client_id: process.env.CLIENT_ID
})

const API_URL = 'api/v1'

const $moltin = {
  async createCustomer (customer) {
    await Moltin.Customers.Create(customer)
  },

  async customerToken (credentials) {
    await axios.post(`${API_URL}/sign-in`, credentials)
  },

  async getCustomer (customerId) {
    await axios.post(`${API_URL}/get-customer`, {
      customer_id: customerId
    })
  }
}

export default function (context, inject) {
  inject('moltin', $moltin)
}
