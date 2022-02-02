const { Sale } = require('../../database/models');
const validate = require('../../services/validate');

const ERROR_MESSAGE = `Status must be one of those 
['Pendente', 'Preparando', 'Em Trânsito', 'Entregue']`;

module.exports = (io, socket) => {
  socket.on('updateStatus', async ({ id, status }) => {
    const { error } = validate.status(status);

    if (error) {
      return socket.emit('updateError', {
        eventError: {
          code: 'bad_request',
          message: ERROR_MESSAGE,
        },
      });
    }

    await Sale.update({ status }, { where: { id } });

    socket.broadcast.emit('updateStatus', { id, status });
  });
};
