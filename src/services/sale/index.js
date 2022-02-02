const create = require('./create');
const getAll = require('./getAll');
const getById = require('./getById');
const remove = require('./remove');
const getByUserId = require('./getByUserId');
const getBySellerId = require('./getBySellerId');
const updateStatus = require('./updateStatus');

module.exports = {
  create,
  getAll,
  getById,
  remove,
  getByUserId,
  getBySellerId,
  updateStatus,
};
