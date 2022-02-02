const express = require('express');

const { auth, adminOrSeller } = require('../middlewares');

const saleController = require('../controllers/sale');

const router = express.Router();

router.post('/', auth, saleController.create);
router.get('/', auth, saleController.getAll);
router.get('/user/:userId', auth, saleController.getByUserId);
router.get('/seller/:sellerId', auth, adminOrSeller, saleController.getBySellerId);
router.get('/:id', auth, adminOrSeller, saleController.getById);
router.delete('/:id', auth, adminOrSeller, saleController.remove);
router.patch('/:id', auth, saleController.updateStatus);

module.exports = router;
