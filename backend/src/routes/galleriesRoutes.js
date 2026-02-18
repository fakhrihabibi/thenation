const express = require('express');
const router = express.Router();
const { getAll, create, remove } = require('../controllers/galleriesController');
const { requireAuth, requireStaff } = require('../middleware/authMiddleware');

router.get('/', getAll);
router.post('/', requireAuth, requireStaff, create);
router.delete('/:id', requireAuth, requireStaff, remove);

module.exports = router;
