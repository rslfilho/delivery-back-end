const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const SaleProductModel = require('../../database/models/salesproducts');

describe('O model de SaleProduct', () => {
  const SaleProduct = SaleProductModel(sequelize, dataTypes);
  const saleProduct = new SaleProduct();

  describe('possui o nome "SaleProduct"', () => {
    checkModelName(SaleProduct)('SaleProduct');
  });

  describe('possui a propriedade "quantity"', () => {
    ['quantity'].forEach(checkPropertyExists(saleProduct));
  });
});
