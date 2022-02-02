const invalidUser = {
  name: "Usuário Teste",
  email: "usuario_teste@",
  password: "senhaDeTeste",
  role: "seller"
}

const newUser = {
  name: "Usuário Teste",
  email: "usuario_teste@email.com",
  password: "senhaDeTeste",
  role: "seller"
};

const newUserResponse = {
  id: 4,
  name: "Usuário Teste",
  email: "usuario_teste@email.com",
  role: "seller",
};

const updatedUser = {
  name: "Usuário Teste Updated",
  email: "usuario_teste2@email.com",
  password: "senhaDeTeste",
  role: "seller"
};

const adminUser = {
  id: 1,
  name: "Delivery App Admin",
  email: "adm@deliveryapp.com",
  role: "administrator"
}

const registeredUser = {
  name: "Usuário Com Email Existente",
  email: "adm@deliveryapp.com",
  password: "senhaDeTeste",
  role: "seller"
}

module.exports = {
  newUser,
  newUserResponse,
  invalidUser,
  registeredUser,
  adminUser,
  updatedUser,
};
