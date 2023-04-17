require('dotenv').config();
const {app} = require('./app');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
const PROTOCOL = process.env.PROTOCOL || 'http';
const BASE_PATH = process.env.BASE_PATH || '';

app.listen(PORT, HOST, () => {
    console.log(`Server listen at address ${PROTOCOL}://${HOST}:${PORT}/${BASE_PATH}`)
})