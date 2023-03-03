import axios from "axios";

export default axios.create({
    baseURL: 'http://io-dev.avehub.ml/api/',
    withCredentials: true
})