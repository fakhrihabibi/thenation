const express = require('express');
const router = express.Router();
const { getAll, getById, create, updateStatus, remove } = require('../controllers/bookingsController');
const { requireAuth, requireStaff } = require('../middleware/authMiddleware');

// Public - create a booking
router.post('/', create);

// Protected - manage bookings
router.get('/', requireAuth, requireStaff, getAll);
router.get('/:id', requireAuth, requireStaff, getById);
router.patch('/:id/status', requireAuth, requireStaff, updateStatus);
router.delete('/:id', requireAuth, requireStaff, remove);

module.exports = router;
