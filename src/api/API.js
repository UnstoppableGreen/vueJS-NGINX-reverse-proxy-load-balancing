import axios from 'axios'

const API = axios.create({
    //baseURL:'https://reqres.in/api'
	baseURL:'http://localhost:8080/'
})

export default API



