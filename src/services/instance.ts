import axios from 'axios'

const strapi = axios.create({
  baseURL: process.env.STRAPI_URL,
})

export default strapi
