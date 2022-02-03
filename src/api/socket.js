const http = require('http');
const socket = require('socket.io');
const express = require('./app');

const httpServer = http.createServer(express);

const io = socket(
  httpServer,
  {
    cors: {
      origin: 'https://beersdelivery.vercel.app',
      methods: ['GET', 'POST'],
    },
  },
);

require('../sockets/status')(io);

module.exports = httpServer;
