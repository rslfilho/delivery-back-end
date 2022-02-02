const chai = require('chai');
const chaiHttp = require('chai-http');
const { stub } = require('sinon');

const app = require('../../api/app');
const { userMock } = require('../mocks')
const userService = require('../../services/user');

chai.use(chaiHttp);

const { expect } = chai;

describe('GET/users/:id', () => {
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
      stub(userService, 'getById').rejects();
      response = await chai.request(app)
        .get('/users/3')
        .set('Authorization', token)

      await userService.getById.restore();
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

  describe('Não é possível retornar o usuário', () => {
    describe('com token de autenticação ausente', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .get('/users/3')
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
          .get('/users/3')
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

    describe('em caso de o usuário authenticado for consumidor e buscar por ID diferente do seu', () => {
      let response;
      before(async () => {
        await chai.request(app)
          .post('/users/register')
          .send({
            name: 'Usuário Teste 2',
            email: 'usuario_teste_2@email.com',
            password: 'senhaDeTeste',
          });

        const { body: { token: newToken } } = await chai.request(app)
          .post('/login')
          .send({
            email: 'usuario_teste_2@email.com',
            password: 'senhaDeTeste',
          });

        response = await chai.request(app)
          .get('/users/3')
          .set('Authorization', newToken);
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

    describe('que não exista no banco de dados', () => {
      let response;
      before(async () => {
        response = await chai.request(app)
          .get('/users/999')
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

  describe('É possível retornar o usuário com token válido e ID existente', () => {
    let response;
      before(async () => {
        response = await chai.request(app)
        .get('/users/3')
        .set('Authorization', token)
      });
      
      it('retorna o código de status 200', () => {
        expect(response).to.have.status(200);
      });

      it('retorna um objeto', () => {
        expect(response.body).to.be.an('object');
      });

      it('o objeto possui as propriedades "id", "name", "email", "role"', () => {
        expect(response.body).to.have.all.keys('id', 'name', 'email', 'role');
      });
  });
});
