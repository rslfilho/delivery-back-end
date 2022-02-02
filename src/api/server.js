const server = require('./socket');

const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Api rodando na porta ${port}`));
