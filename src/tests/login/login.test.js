const chai = require('chai');
const chaiHttp = require('chai-http');
const { stub } = require('sinon');

const app = require('../../api/app');
const { loginMock } = require('../mocks');
const { User } = require('../../database/models');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST/login', () => {
  describe('Em caso de erro interno', () => {
    let response;

    before(async () => {
      stub(User, 'findOne').rejects();

      response = await chai.request(app)
        .post('/login')
        .send({
          email: 'zebirita@email.com',
          password: '$#zebirita#$',
        });

      await User.findOne.restore();
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

  describe('Não é possível fazer login', () => {
    describe('com um email inválido', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/login')
          .send({
            email: 'email@email',
            password: '123456789',
          });
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

    describe('com uma senha inválida', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/login')
          .send({
            email: 'adm@deliveryapp.com',
            password: 's',
          });
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

    describe('com uma senha incorreta', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/login')
          .send({
            email: 'adm@deliveryapp.com',
            password: 'senhaIncorreta',
          });
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

      it('a propriedade "message" possui o texto ""password" is invalid"', () => {
        expect(response.body.message).to.be.equal('"password" is invalid');
      });
    });
    
    describe('com um email que não está cadastrado', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .post('/login')
          .send({
            email: 'email@email.com',
            password: 'senhaTeste',
          });
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

  describe('É possível fazer login com dados corretos', () => {
    let response;
      before(async () => {
        response = await chai.request(app)
          .post('/login')
          .send({
            email: 'zebirita@email.com',
            password: '$#zebirita#$',
          });
      });
      
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui as propriedades "id", "name", "email", "role" e "token"', () => {
        expect(response.body).to.have.all.keys('id', 'name', 'email', 'role', 'token');
      });

      it('o objeto é igual ao esperado, com exceção do token', () => {
        expect(response.body).to.include(loginMock.customer);
      });
  });
});
