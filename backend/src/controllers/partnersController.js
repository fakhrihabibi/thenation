const { pool } = require('../config/db');

const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM partners ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Get partners error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const create = async (req, res) => {
    try {
        const { name, logo_url, website_url } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Partner name is required.' });
        }
        const result = await pool.query(
            'INSERT INTO partners (name, logo_url, website_url) VALUES ($1, $2, $3) RETURNING *',
            [name, logo_url, website_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create partner error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, logo_url, website_url } = req.body;
        const result = await pool.query(
            'UPDATE partners SET name = COALESCE($1, name), logo_url = COALESCE($2, logo_url), website_url = COALESCE($3, website_url) WHERE id = $4 RETURNING *',
            [name, logo_url, website_url, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Partner not found.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Update partner error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM partners WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Partner not found.' });
        }
        res.json({ message: 'Partner deleted successfully.' });
    } catch (error) {
        console.error('Delete partner error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { getAll, create, update, remove };
