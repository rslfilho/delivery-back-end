const chai = require('chai');
const chaiHttp = require('chai-http');
const { stub } = require('sinon');

const app = require('../../api/app');
const { productMock } = require('../mocks')
const productService = require('../../services/product');

chai.use(chaiHttp);

const { expect } = chai;

describe('GET/products', () => {
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
      stub(productService, 'getAll').rejects();
      response = await chai.request(app)
        .get('/products')
        .set('Authorization', token)

      await productService.getAll.restore();
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

  describe('Não é possível listar produtos', () => {
    describe('com token de autenticação ausente', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .get('/products')
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
          .get('/products')
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
  });

  describe('É possível listar produtos com token válido', () => {
    let response;
      before(async () => {
        response = await chai.request(app)
        .get('/products')
        .set('Authorization', token)
      });
      
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um array', () => {
        expect(response.body).to.be.an('array');
      });

      it('o array possui objetos', () => {
        expect(response.body[0]).to.be.an('object');
      })

      it('o objeto possui as propriedades "id", "name", "price", "urlImage"', () => {
        expect(response.body[0]).to.have.all.keys('id', 'name', 'price', 'urlImage');
      });

      it('o array possui um elemento igual ao mock', () => {
        expect(response.body).to.deep.include(productMock.registeredProductWithId)
      });
  });
});
