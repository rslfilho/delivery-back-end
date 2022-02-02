const { expect } = require('chai');
const client = require('socket.io-client');

const socketServer = require('../../api/socket');
const { Sale } = require('../../database/models');

describe('Servidor socket', () => {
  let clientA;
  let clientB;

  before(() => {
    socketServer.listen(3002);
    clientA = client('http://localhost:3002');
    clientB = client('http://localhost:3002');
  });

  after(() => {
    clientA.close();
    clientB.close();
  });

  describe('quando recebe um eveneto "updateStatus" com dados inválidos', () => {
    it('retorna um evento de erro pro cliente', (done) => {
      clientA.on('updateError', (response) => {
        expect(response).to.be.an('object');
        expect(response).to.have.all.keys('eventError');
        expect(response.eventError).to.be.an('object');
        expect(response.eventError).to.have.all.keys('code', 'message');
        expect(response.eventError.message).to.eq('Status must be one of those \n[\'Pendente\', \'Preparando\', \'Em Trânsito\', \'Entregue\']');
        done();
      });
      clientA.emit('updateStatus', { id: 1, status: 'Inválido' });
    });
  });

  describe('quando recebe um evento de "updateStatus" com dados corretos', () => {
    it('envia os dados corretos pro cliente', (done) => {
      clientA.on('updateStatus', ({ id, status }) => {
        expect(id).to.eq(1);
        expect(status).to.eq('Em Trânsito');
        done();
      });
      clientB.emit('updateStatus', { id: 1, status: 'Em Trânsito' });
    });
    
    it('atualiza os dados no banco de dados', async () => {
      await clientA.emit('updateStatus', { id: 1, status: 'Entregue' });
      setTimeout(async () => {
        const { status } = await Sale.findByPk(1);
        expect(status).to.eq('Entregue');
      }, 500)
    });
  });
});
