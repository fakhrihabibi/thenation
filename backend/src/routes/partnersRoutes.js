const express = require('express');
const router = express.Router();
const { getAll, create, update, remove } = require('../controllers/partnersController');
const { requireAuth, requireStaff } = require('../middleware/authMiddleware');

router.get('/', getAll);
router.post('/', requireAuth, requireStaff, create);
router.put('/:id', requireAuth, requireStaff, update);
router.delete('/:id', requireAuth, requireStaff, remove);

module.exports = router;
