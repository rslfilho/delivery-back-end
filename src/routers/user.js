const express = require('express');

const { auth, admin, adminOrSeller } = require('../middlewares');

const userController = require('../controllers/user');

const router = express.Router({ mergeParams: true });

router.post('/', auth, admin, userController.create);
router.post('/register', userController.register);
router.get('/', auth, userController.getAll);
router.get('/sales', auth, adminOrSeller, userController.getAllAndSales);
router.get('/:id', auth, userController.getById);
router.get('/:id/sales', auth, userController.getByIdAndSales);
router.delete('/:id', auth, admin, userController.remove);
router.put('/:id', auth, admin, userController.update);

module.exports = router;
