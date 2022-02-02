const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const SaleModel = require('../../database/models/sale');

describe('O model de Sale', () => {
  const Sale = SaleModel(sequelize, dataTypes);
  const sale = new Sale();

  describe('possui o nome "Sale"', () => {
    checkModelName(Sale)('Sale');
  });

  describe('possui as propriedades "userId", "sellerId", "totalPrice", "deliveryAddress", "deliveryNumber", "saleDate" e "status"', () => {
    ['userId', 'sellerId', 'totalPrice', 'deliveryAddress', 'deliveryNumber', 'saleDate', 'status'].forEach(checkPropertyExists(sale));
  });
});
