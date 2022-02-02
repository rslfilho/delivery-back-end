const cors = require('cors');
const path = require('path');
const express = require('express');

const root = require('../routers/root');
const { error, swagger } = require('../middlewares');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));

app.use('/swagger', swagger.serve, swagger.setup);
app.use(root);
app.use(error);

module.exports = app;
