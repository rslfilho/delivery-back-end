const chai = require('chai');
const chaiHttp = require('chai-http');
const { stub } = require('sinon');

const app = require('../../api/app');
const saleService = require('../../services/sale');

chai.use(chaiHttp);

const { expect } = chai;

describe('GET/sales/seller/:sellerId', () => {
  let token;
  before(async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'fulana@deliveryapp.com',
        password: 'fulana@123',
      });
    
    token = response.body.token;
  });

  describe('Em caso de erro interno', () => {
    let response;
    before(async () => {
      stub(saleService, 'getBySellerId').rejects();
      response = await chai.request(app)
        .get('/sales/seller/2')
        .set('Authorization', token)

      await saleService.getBySellerId.restore();
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

  describe('Não é possível retornar a venda', () => {
    describe('com token de autenticação ausente', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .get('/sales/seller/2')
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
          .get('/sales/seller/2')
          .set('Authorization', 'tokenIvalido')
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

    describe('que não exista no banco de dados', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .get('/sales/seller/999')
          .set('Authorization', token)
      });

      it('retorna o código de status 404', () => {
        expect(response).to.have.status(404);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "User does not exist"', () => {
        expect(response.body.message).to.be.equal('User does not exist');
      });
    });
  });

  describe('É possível retornar a venda com token válido e ID existente', () => {
    let response;
      before(async () => {
        response = await chai.request(app)
        .get('/sales/seller/2')
        .set('Authorization', token)
      });
      
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('array');
      });

      it('o array possui objetos', () => {
        expect(response.body[0]).to.be.an('object');
      })

      it('o objeto possui as propriedades "id", "customer", "totalPrice", "deliveryAddress", "deliveryNumber", "saleDate", "status" e "products', () => {
        expect(response.body[0]).to.have.all.keys('id', 'customer', 'totalPrice', 'deliveryAddress', 'deliveryNumber', 'saleDate', 'status', 'products');
      });
  });
});
