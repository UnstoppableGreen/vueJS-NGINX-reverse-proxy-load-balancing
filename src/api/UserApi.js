import axios from 'axios'

const User = axios.create({
    //baseURL:'https://reqres.in/api'
	baseURL:'http://localhost:8080/'
})

export default User



