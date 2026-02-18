const { pool } = require('../config/db');

const getAll = async (req, res) => {
    try {
        const { status } = req.query;
        let query = 'SELECT b.*, s.name as service_name FROM bookings b LEFT JOIN services s ON b.service_id = s.id';
        const params = [];
        if (status) {
            query += ' WHERE b.status = $1';
            params.push(status);
        }
        query += ' ORDER BY b.created_at DESC';
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            'SELECT b.*, s.name as service_name FROM bookings b LEFT JOIN services s ON b.service_id = s.id WHERE b.id = $1',
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Booking not found.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const create = async (req, res) => {
    try {
        const { client_name, email, event_date, service_id, message } = req.body;
        if (!client_name || !email || !event_date) {
            return res.status(400).json({ error: 'Client name, email, and event date are required.' });
        }
        const result = await pool.query(
            'INSERT INTO bookings (client_name, email, event_date, service_id, message, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [client_name, email, event_date, service_id || null, message, 'pending']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status || !['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Valid status is required (pending, confirmed, cancelled).' });
        }
        const result = await pool.query(
            'UPDATE bookings SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
            [status, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Booking not found.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Update booking error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Booking not found.' });
        }
        res.json({ message: 'Booking deleted successfully.' });
    } catch (error) {
        console.error('Delete booking error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { getAll, getById, create, updateStatus, remove };
