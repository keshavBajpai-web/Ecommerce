import axios from 'axios'

const api = axios.create({
    baseURL: "https://ecommerce-3-7smf.onrender.com/api"
})
export default api
