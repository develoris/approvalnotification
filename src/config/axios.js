const axios = require('axios').default;

const AXIOS_AUTH = axios.create({
    baseURL: process.env.OAUTH_BASE_URL
})
const AXIOS_NOTIFICATION = axios.create({
    baseURL: process.env.NOTIFICATION_URL,
    headers:{
        'Accept': 'application/json'
    }
});
module.exports = { AXIOS_AUTH, AXIOS_NOTIFICATION };