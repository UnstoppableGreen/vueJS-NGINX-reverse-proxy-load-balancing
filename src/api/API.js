import axios from 'axios'
import { getToken } from '@baloise/vue-keycloak'

const API = axios.create({
	baseURL:process.env.VUE_APP_MAIN_SERVICE+'/main-service'
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



