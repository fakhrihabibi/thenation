const { pool } = require('../config/db');

const getAll = async (req, res) => {
    try {
        const { event_id } = req.query;
        let query = 'SELECT g.*, e.title as event_title FROM galleries g LEFT JOIN events e ON g.event_id = e.id';
        const params = [];
        if (event_id) {
            query += ' WHERE g.event_id = $1';
            params.push(event_id);
        }
        query += ' ORDER BY g.created_at DESC';
        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Get galleries error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const create = async (req, res) => {
    try {
        const { event_id, image_url, caption } = req.body;
        if (!image_url) {
            return res.status(400).json({ error: 'Image URL is required.' });
        }
        const result = await pool.query(
            'INSERT INTO galleries (event_id, image_url, caption) VALUES ($1, $2, $3) RETURNING *',
            [event_id, image_url, caption]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create gallery error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM galleries WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Gallery image not found.' });
        }
        res.json({ message: 'Gallery image deleted successfully.' });
    } catch (error) {
        console.error('Delete gallery error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { getAll, create, remove };
