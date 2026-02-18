const { pool } = require('../config/db');

const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM testimonials ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Get testimonials error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM testimonials WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Testimonial not found.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Get testimonial error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const create = async (req, res) => {
    try {
        const { client_name, photo_url, rating, message } = req.body;
        if (!client_name || !message) {
            return res.status(400).json({ error: 'Client name and message are required.' });
        }
        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
        }
        const result = await pool.query(
            'INSERT INTO testimonials (client_name, photo_url, rating, message) VALUES ($1, $2, $3, $4) RETURNING *',
            [client_name, photo_url, rating || 5, message]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create testimonial error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { client_name, photo_url, rating, message } = req.body;
        if (rating && (rating < 1 || rating > 5)) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
        }
        const result = await pool.query(
            'UPDATE testimonials SET client_name = COALESCE($1, client_name), photo_url = COALESCE($2, photo_url), rating = COALESCE($3, rating), message = COALESCE($4, message) WHERE id = $5 RETURNING *',
            [client_name, photo_url, rating, message, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Testimonial not found.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Update testimonial error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Testimonial not found.' });
        }
        res.json({ message: 'Testimonial deleted successfully.' });
    } catch (error) {
        console.error('Delete testimonial error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { getAll, getById, create, update, remove };
