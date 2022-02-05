# API da Aplicação de Delivery de Cervejas

## Índice

- [Descrição](#Descrição)
- [Como Usar Online](#Como-Usar-Online)
- [Como Usar Localmente](#Como-usar-no-ambiente-local)
- [Desenvolvimento](#Desenvolvimento)
- [Arquitetura](#Arquitetura)
- [Outros Scripts da Aplicação](#outros-scripts-configurados-na-aplicação)
- [Deploy](#Deploy)
- [Contato](#Contato)

## Descrição

Repositório com o código de uma **API Rest**, em Node.js com Express. O banco de dados é em MySql com Sequelize como ORM.

Esta API foi desenvolvida para o trabalho de conclusão do módulo de back-end da Trybe, projeto App de Delivery.

O objetivo era criar uma aplicação para uma cliente que tinha um depósito de bebidas e fazia entrega.
Com o crescimento da demanda por entregas em várias partes da cidade, ficou difícil fazer o controle apenas por meio de tabelas.
Dessa forma ela solicitou uma aplicação para a venda, controle de entregas e administração dos usuários.

Foi desenvolvida a aplicação back-end para para que fosse possível fazer toda a dinâmica de:

- Fluxo do cliente
  - Apresentar produtos; 
  - Fazer pedidos;
  - Acompanhar pedidos;
- Fluxo do vendedor
  - Gerenciar pedidos (mudando o status dele);
- Fluxo do administrador
  - Gerenciar usuários;

Foi desenvolvida uma aplicação front-end que se encontra [nesse repositório](https://github.com/rslfilho/delivery-front-end).

## Como usar online

Para acessar a página Swagger da aplicação rodando e/ou testar a aplicação, ver detalhadamente os parâmetros esperados, as possíveis respostas e sua formatação, basta clicar [aqui](https://g3-deliveryapp-backend.herokuapp.com/swagger/).

A aplicação front-end online pode ser acessada [aqui](https://beersdelivery.vercel.app/). Para logar, você pode usar os dados abaixo:

```
Admin:
- email: adm@deliveryapp.com
- senha: --adm2@21!!--

Vendedor:
- email: fulana@deliveryapp.com
- senha: fulana@123

Consumidor:
- email: zebirita@email.com
- senha: $#zebirita#$
```

## Como usar no ambiente local

1 - Para clonar o repositório, vá até o diretório onde deseja clonar, execute o `git clone` e depois entre no diretório criado:

```bash
git clone git@github.com:rslfilho/delivery-back-end.git
cd delivery-back-end
```

2- Já dentro do diretório, instale as depedências:

```bash
npm install
```

3 - Configure um arquivo `.env` na raiz da aplicação com os seguintes dados:

```env
NODE_ENV=development
API_PORT=3001
MYSQL_HOST=locahost
MYSQL_PORT=3306
MYSQL_USER=<seu_username>
MYSQL_PASSWORD=<sua_senha>
MYSQL_DB_NAME=delivery-app
EVAL_ALWAYS_RESTORE_DEV_DB=true
```

4 - Mude os endereços liberados nas configurações da API para `localhost`:

`/src/api/app.js`
```javascript
(...)
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};
(...)
```

`/src/api/socket.js`
```javascript
(...)
const io = socket(
  httpServer,
  {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
  },
);
(...)
```

5 - Execute o comando para criar e migrar o banco de dados:

```bash
npm run db:reset
```

6 - Depois de instaladas as depedências, inicie a aplicação:

```bash
npm start
```

7 - A aplicação estárá rodando e acessível em `http://localhost:3001/`. A porta pode modificar se tiver uma variável `PORT` no ambiente que estiver executando.
Para acessar pode utilizar os seguintes dados de login:

```
Admin:
- email: adm@deliveryapp.com
- senha: --adm2@21!!--

Vendedor:
- email: fulana@deliveryapp.com
- senha: fulana@123

Consumidor:
- email: zebirita@email.com
- senha: $#zebirita#$
```

8 - Para acessar a descrição da API e/ou testar seu funcionamento, ver detalhadamente os parâmetros esperados, as possíveis respostas e sua formatação, basta acessar `http://localhost:3001/swagger/`.

## Desenvolvimento

A API foi desenvolvida em Node.js com Express. Usando banco de dados MySql e Sequelize como ORM.

Além disso, as dependências da aplicação são:

- `cors` para liberação de acesso;
- `joi` para validação de `schemas` e dados;
- `jsonwebtoken` para autenticação de acesso;
- `md5` para codificar a senha dos usuários em hash;
- `socket.io` para comunicação instatânea entre back e front e múltiplos clientes;
- `swagger-ui-express` para criação da página visual de descrição e teste da API
- `yamljs` para leitura do arquivo `yaml` de configuração do Swagger

No ambiente de desenvolvimento ainda são usadas as dependências:

- `mocha`, `chai`, `chai-http`, `sequelize-test-helpers` e `sinon` para os testes;
- `nyc` para gerar os relatórios de cobertura de testes
- `nodemon` para iniciar a aplicação com reinício automático
- `eslint`, `eslint-config-trybe-backend`, para configuração do ESLint

## Arquitetura

A API está contida na pasta `/src` dentro da raiz do repositório, fora dela temos:

- `/public` diretório público onde ficam as imagens dos produtos acessível aos clientes;

Na pasta `/src` temos:

- `/api` arquivos de configuração e início da aplicação;
- `/controllers` arquivos de Controllers de todas as rotas da aplicação;
- `/database` arquivos de configuração do ORM Sequelize, como Models, Migrations e Seeders;
- `/helpers` funções ou dados auxiliares
- `/middlewares` arquivos de middlewares como o de Erro, de Autenticação e o de configuração do Swagger;
- `/routers` configuração de roteadores do Express para todas as rotas;
- `/sockets` arquivos de configuração dos eventos de socket
- `/services` arquivos de Serviços da aplicação, de todas as rotas e de validação;
- `/tests` arquivos de testes de integração;

## Outros Scripts configurados na aplicação

* `npm run db:reset` para dropar, re-criar e fazer a migração do banco de dados
* `npm run dev` para rodar a aplicação com Nodemon e reinício automático na atualização de qualquer arquivo;
* `npm run test` para rodar todos os testes;
* `npm run test:coverage` para rodar todos os testes e gerar o relatório de cobertura na tela do terminal;
* `npm run test:coverage:json` para rodar todos os testes e gerar o relatório de cobertura em json, acessível na pasta `/coverage`;
* `npm run test:coverage:report` para rodar todos os testes e gerar o relatório de cobertura em html, acessível na pasta `/coverage/lcov-report/`;
* `npm run lint` para rodar o ESLint;

## Deploy

Esta aplicação está rodando na plataforma do Heroku, usando a integração direta com o GitHub.

Esta acessível pelo endpoint `https://g3-deliveryapp-backend.herokuapp.com/`.

É possível acessar a página Swagger da aplicação rodando e/ou testar a aplicação, ver detalhadamente os parâmetros esperados, as possíveis respostas e sua formatação [aqui](https://g3-deliveryapp-backend.herokuapp.com/swagger/).

## Contato

Desenvolvido por Roberval Filho

Email: rslfilho@gmail.com

Github: https://github.com/rslfilho

LinkedIn: https://www.linkedin.com/in/rslfilho/
