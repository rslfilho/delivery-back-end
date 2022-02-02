const newProduct = {
  name: "Novo Produto Teste",
  price: 12.93,
  urlImage: "http://url.image/",
};

const invalidProduct = {
  price: 12.93,
  urlImage: "http://url.image/",
};

const registeredProduct = {
  name: "Skol Lata 250ml",
  price: "2.20",
  urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
};

const registeredProductWithId = {
  id: 1,
  name: "Skol Lata 250ml",
  price: "2.20",
  urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
};

const updatedProduct = {
  name: "Skol Lata 2 250ml",
  price: "3.20",
  urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
};

module.exports = {
  newProduct,
  invalidProduct,
  registeredProduct,
  registeredProductWithId,
  updatedProduct,
};
