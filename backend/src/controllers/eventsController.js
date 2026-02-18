const { pool } = require('../config/db');

const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM events ORDER BY date ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Get event error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const create = async (req, res) => {
    try {
        const { title, date, location, description, image_url } = req.body;
        if (!title || !date || !location) {
            return res.status(400).json({ error: 'Title, date, and location are required.' });
        }
        const result = await pool.query(
            'INSERT INTO events (title, date, location, description, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, date, location, description, image_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create event error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, location, description, image_url } = req.body;
        const result = await pool.query(
            'UPDATE events SET title = COALESCE($1, title), date = COALESCE($2, date), location = COALESCE($3, location), description = COALESCE($4, description), image_url = COALESCE($5, image_url), updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
            [title, date, location, description, image_url, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Update event error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM events WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found.' });
        }
        res.json({ message: 'Event deleted successfully.' });
    } catch (error) {
        console.error('Delete event error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { getAll, getById, create, update, remove };
