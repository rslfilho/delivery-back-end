const express = require('express');

const { auth, adminOrSeller } = require('../middlewares');

const productController = require('../controllers/product');

const router = express.Router();

router.get('/', auth, productController.getAll);
router.post('/', auth, adminOrSeller, productController.create);
router.get('/:id', auth, productController.getById);
router.delete('/:id', auth, adminOrSeller, productController.remove);
router.put('/:id', auth, adminOrSeller, productController.update);

module.exports = router;
