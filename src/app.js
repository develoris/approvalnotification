const bodyParser = require('body-parser');
const app = require('express')();
const BASE_PATH = process.env.BASE_PATH || '';

app.use(require('./middleware/oauth2.middleware'));

app.use(bodyParser.json())
console.log(`/${BASE_PATH}/notification`);
app.use(`/${BASE_PATH}/notification`, require('./routes/notification/notification.route'))

module.exports = { app }