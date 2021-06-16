import axios from 'axios';
import {endpoint} from '../../properties.json'

const instance = axios.create({
    timeout: 1000 * 60
})

instance.interceptors.request.use(config=>{
    config.url = endpoint + config.url;
    return config;
})

export default instance;