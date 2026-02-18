const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/testimonialsController');
const { requireAuth, requireStaff } = require('../middleware/authMiddleware');

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', requireAuth, requireStaff, create);
router.put('/:id', requireAuth, requireStaff, update);
router.delete('/:id', requireAuth, requireStaff, remove);

module.exports = router;
