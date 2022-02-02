const express = require('express');

const loginRouter = require('./login');
const userRouter = require('./user');
const productRouter = require('./product');
const saleRouter = require('./sale');

const root = express.Router({ mergeParams: true });

root.use('/login', loginRouter);
root.use('/users', userRouter);
root.use('/products', productRouter);
root.use('/sales', saleRouter);

module.exports = root;
