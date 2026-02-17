const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.SVR_PORT || 3000;
const SERVER = process.env.SVR_HOST || '0.0.0.0';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routes = require('./routes/api');
app.use('/api', routes);

app.listen(PORT, SERVER, () => {
    console.log(`BrandPulse API running on port ${PORT}`);
});

module.exports = app;