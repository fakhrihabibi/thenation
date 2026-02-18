const { pool } = require('../config/db');

const getStats = async (req, res) => {
    try {
        const [eventsResult, bookingsResult, clientsResult, servicesResult] = await Promise.all([
            pool.query('SELECT COUNT(*) as total FROM events'),
            pool.query('SELECT COUNT(*) as total, status FROM bookings GROUP BY status'),
            pool.query('SELECT COUNT(DISTINCT email) as total FROM bookings'),
            pool.query('SELECT COUNT(*) as total FROM services'),
        ]);

        const bookingStats = {};
        bookingsResult.rows.forEach((row) => {
            bookingStats[row.status] = parseInt(row.total);
        });

        res.json({
            totalEvents: parseInt(eventsResult.rows[0].total),
            totalClients: parseInt(clientsResult.rows[0].total),
            totalServices: parseInt(servicesResult.rows[0].total),
            bookings: {
                total: Object.values(bookingStats).reduce((a, b) => a + b, 0),
                ...bookingStats,
            },
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { getStats };
