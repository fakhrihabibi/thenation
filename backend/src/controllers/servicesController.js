const { pool } = require('../config/db');

const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM services ORDER BY id ASC');
        res.json(result.rows);
    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service not found.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Get service error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const create = async (req, res) => {
    try {
        const { name, price, description, icon } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Service name is required.' });
        }
        const result = await pool.query(
            'INSERT INTO services (name, price, description, icon) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, price, description, icon]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Create service error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, icon } = req.body;
        const result = await pool.query(
            'UPDATE services SET name = COALESCE($1, name), price = COALESCE($2, price), description = COALESCE($3, description), icon = COALESCE($4, icon), updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *',
            [name, price, description, icon, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service not found.' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Update service error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

const remove = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM services WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Service not found.' });
        }
        res.json({ message: 'Service deleted successfully.' });
    } catch (error) {
        console.error('Delete service error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

module.exports = { getAll, getById, create, update, remove };
