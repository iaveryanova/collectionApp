import axios from "axios";

export default axios.create({
    // baseURL: 'http://localhost:3022/api/',
    baseURL: 'http://io-dev.avehub.ml/api/',
    withCredentials: true
})