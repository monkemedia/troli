const axios = require('axios')
const baseUrl = `${process.env.SUBDOMAIN}.commercelayer.io`

const authClient = axios.create({
  baseURL: baseUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

const getAccessToken = async () => {
    try {
      const response = await authClient.post('/oauth/token', {
        grant_type: 'client_credentials',
        client_id: process.env.CLIENT_ID,
        scope: process.env.SCOPE
      })
      return response.data.access_token
    } catch (error) {
      console.log('Get access token error:', error)
    }
}

module.exports.getAccessToken = getAccessToken
