import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://localhost:3333',
    baseURL: 'https://proffy-theedouglasam.herokuapp.com/',
})

export default api