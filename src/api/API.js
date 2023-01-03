import axios from 'axios'
import { getToken } from '@baloise/vue-keycloak'

const API = axios.create({
	baseURL:'http://192.168.0.103:8081/main-service'
})

API.interceptors.request.use(
    async config => {
        const token = await getToken()
        config.headers = {
          Authorization: `Bearer ${token}`,
        }
        return config
      },
      error => {
        Promise.reject(error)
      },
)
export default API



