require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');

const root = require('../routers/root');
const { error, swagger } = require('../middlewares');

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));

app.use('/swagger', swagger.serve, swagger.setup);
app.use(root);
app.use(error);

module.exports = app;
