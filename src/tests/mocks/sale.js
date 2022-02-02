const newSale = {
  userId: 3,
  sellerId: 2,
  totalPrice: 111.11,
  deliveryAddress: "Rua Teste de Delivery",
  deliveryNumber: "99",
  products: [
    {
      id: 1,
      quantity: 2
    },
    {
      id: 2,
      quantity: 3
    },
    {
      id: 3,
      quantity: 4
    },
  ]
};

const invalidSale = {
  userId: 3,
  sellerId: 2,
  deliveryAddress: "Rua Teste de Delivery",
  deliveryNumber: "99",
  products: [
    {
      id: 1,
      quantity: 2
    },
    {
      id: 2,
      quantity: 3
    },
    {
      id: 3,
      quantity: 4
    },
  ]
};

const registeredSaleWithId = {
  id: 1,
  name: "Skol Lata 250ml",
  price: "2.20",
  urlImage: "http://localhost:3001/images/skol_lata_350ml.jpg",
};

module.exports = {
  newSale,
  invalidSale,
  registeredSaleWithId,
};
