const create = require('./create');
const getAll = require('./getAll');
const getByUserId = require('./getByUserId');
const getBySellerId = require('./getBySellerId');
const getById = require('./getById');
const remove = require('./remove');
const updateStatus = require('./updateStatus');

module.exports = {
  create,
  getAll,
  getByUserId,
  getBySellerId,
  getById,
  remove,
  updateStatus,
};
