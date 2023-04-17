const { AXIOS_AUTH } = require('../config/axios');
const moment = require('moment');
class AuthService {

    token_expiration = null;

    constructor(clientId = null, clientSecret = null) {
        this.clientId = !!clientId || process.env.OAUTH_CLIENT_ID;
        this.clientSecret = !!clientSecret || process.env.CLIENT_SECRET;
        this.token = null;
    }

    async getToken() {
        if (this.token && !(moment.utc().isAfter(this.token_expiration))) {
            console.log(this.token);
            return this.token;
        } else {
            await this.login();
            return this.getToken();
        }
    }
    async login() {
        const authCredentials = { username: process.env.OAUTH_CLIENT_ID, password: process.env.OAUTH_CLIENT_SECRET }
        const authResponse = await AXIOS_AUTH.get("/oauth/token?grant_type=client_credentials", { auth: authCredentials })
        this.token = authResponse.data.access_token;
        this.token_expiration = moment.utc().add(authResponse.data.expires_in - (60 * 5), 'seconds');
    }
}

module.exports = AuthService;