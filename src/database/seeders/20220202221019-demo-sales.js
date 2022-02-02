'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('sales',
    [{
      id: 1,
      user_id: 3,
      seller_id: 2,
      total_price: 51.25,
      delivery_address: 'Rua Itacolomi, Bairro Higienópolis',
      delivery_number: '14',
      sale_date: '2021-12-17 19:28:53',
      status: 'Preparando',
      created_at: '2021-12-17 19:28:53',
      updated_at: '2021-12-17 19:41:32',
    }, {
      id: 2,
      user_id: 3,
      seller_id: 2,
      total_price: 32.21,
      delivery_address: 'Rua Dom Severino, Bairro Fátima',
      delivery_number: '646',
      sale_date: '2022-01-10 14:12:43',
      status: 'Preparando',
      created_at: '2022-01-10 14:12:43',
      updated_at: '2022-01-10 14:12:43',
    },
    ],
    {},
  );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('sales', null, {});
  }
};
