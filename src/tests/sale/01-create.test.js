const chai = require('chai');
const chaiHttp = require('chai-http');
const { stub } = require('sinon');

const app = require('../../api/app');
const { saleMock } = require('../mocks');
const saleService = require('../../services/sale');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST/sales', () => {  
  let token;
  before(async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'zebirita@email.com',
        password: '$#zebirita#$',
    });
    token = response.body.token;
  });

  describe('Em caso de erro interno', () => {
    let response;
    before(async () => {
      stub(saleService, 'create').rejects();
      response = await chai.request(app)
        .post('/sales')
        .set('Authorization', token)
        .send(saleMock.newSale);

      await saleService.create.restore();
    });

    it('retorna o código de status 500', () => {
      expect(response).to.have.status(500);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Internal Error"', () => {
      expect(response.body.message).to.be.equal('Internal Error');
    });
  });

  describe('É possível criar uma venda com dados corretos e token válido', () => {
    let response;
    before(async () => {
      response = await chai.request(app)
      .post('/sales')
      .set('Authorization', token)
      .send(saleMock.newSale);

      await chai.request(app)
      .post('/sales')
      .set('Authorization', token)
      .send(saleMock.newSale);
    });
    
    
    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui as propriedades "id", "userId", "sellerId", "totalPrice", "deliveryAddress", "deliveryNumber", "saleDate", "status", "createdAt" e "updatedAt', () => {
      expect(response.body).to.have.all.keys('id', 'userId', 'sellerId', 'totalPrice', 'deliveryAddress', 'deliveryNumber', 'saleDate', 'status', 'createdAt', 'updatedAt');
    });
  });

  describe('Não é possível criar venda', () => {
    describe('com algum dado inválido', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/sales')
          .set('Authorization', token)
          .send(saleMock.invalidSale);
      });

      it('retorna o código de status 400', () => {
        expect(response).to.have.status(400);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Invalid fields"', () => {
        expect(response.body.message).to.be.equal('Invalid fields');
      });
    });

    describe('com token de autenticação ausente', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/sales')
          .send(saleMock.newSale);
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Token not found"', () => {
        expect(response.body.message).to.be.equal('Token not found');
      });
    });

    describe('com um token de autenticação inválido ou expirado', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/sales')
          .set('Authorization', 'tokenIvalido')
          .send(saleMock.newSale);
      });

      it('retorna o código de status 401', () => {
        expect(response).to.have.status(401);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Expired or invalid token"', () => {
        expect(response.body.message).to.be.equal('Expired or invalid token');
      });
    });
  });
});
