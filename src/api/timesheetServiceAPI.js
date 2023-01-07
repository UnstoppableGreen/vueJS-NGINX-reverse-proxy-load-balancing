import axios from 'axios'
import { getToken } from '@baloise/vue-keycloak'

const timesheetServiceAPI = axios.create({
	baseURL:process.env.VUE_APP_TIMESHEET_SERVICE+'/timesheet-service'
})

timesheetServiceAPI.interceptors.request.use(
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
export default timesheetServiceAPI



