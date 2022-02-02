const chai = require('chai');
const chaiHttp = require('chai-http');
const { stub } = require('sinon');

const app = require('../../api/app');
const { productMock } = require('../mocks');
const productService = require('../../services/product');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST/products', () => {  
  let token;
  before(async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
    });
    token = response.body.token;
  });

  describe('Em caso de erro interno', () => {
    let response;
    before(async () => {
      stub(productService, 'create').rejects();
      response = await chai.request(app)
        .post('/products')
        .set('Authorization', token)
        .send(productMock.newProduct);

      await productService.create.restore();
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

  describe('Não é possível criar produto', () => {
    describe('com algum dado inválido', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/products')
          .set('Authorization', token)
          .send(productMock.invalidProduct);
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
          .post('/products')
          .send(productMock.newProduct);
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
          .post('/products')
          .set('Authorization', 'tokenIvalido')
          .send(productMock.newProduct);
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

    describe('com um usuário que não pode cadastrar produtos', () => {
      let response;
      before(async () => {
        const { body: { token: customerToken } } = await chai.request(app)
          .post('/login')
          .send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
          });

        response = await chai.request(app)
          .post('/products')
          .set('Authorization', customerToken)
          .send(productMock.newProduct);
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

      it('a propriedade "message" possui o texto "Unauthorized user"', () => {
        expect(response.body.message).to.be.equal('Unauthorized user');
      });
    });
    
    describe('com um nome que já exista no banco de dados', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/products')
          .set('Authorization', token)
          .send(productMock.registeredProduct);
      });

      it('retorna o código de status 409', () => {
        expect(response).to.have.status(409);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui a propriedade "message"', () => {
        expect(response.body).to.have.property('message');
      });

      it('a propriedade "message" possui o texto "Product already registered"', () => {
        expect(response.body.message).to.be.equal('Product already registered');
      });
    });
  });

  describe('É possível criar um produto com dados corretos e token válido', () => {
    let response;
    before(async () => {
      response = await chai.request(app)
      .post('/products')
      .set('Authorization', token)
      .send(productMock.newProduct);
    });
    
    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.an('object');
    });

    it('o objeto possui as propriedades "id", "name", "price", "urlImage", "createdAt" e "updatedAt', () => {
      expect(response.body).to.have.all.keys('id', 'name', 'price', 'urlImage', 'createdAt', 'updatedAt');
    });

    it('o objeto é igual ao esperado, com exceção do token', () => {
      expect(response.body).to.include(productMock.newProduct);
    });
  });
});
